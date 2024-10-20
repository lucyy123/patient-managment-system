import Cookies from "js-cookie";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import NotFound from "./Components/NotFound";
import { setToken } from "./redux/reducers/token";
import ProtectedRoute from "./utils/protectedRoutes";
import { TokenInitialReducer, UserReducerInitialState } from "./vite-env";

//*-------- normal imports--------------------

//*-------- lazy imports--------------------

const OnBoarding = lazy(() => import("./pages/OnBoarding"));
const PatientsForm = lazy(() => import("./pages/PatientsForm"));
const Appointment = lazy(() => import("./pages/Appointment"));
const Success = lazy(() => import("./pages/Success"));

//!-------------------------- admin imports----------------------------
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { token } = useSelector(
    (state: { tokenReducer: TokenInitialReducer }) => state.tokenReducer
  );

  useEffect(() => {
    const tokenName = user?.role === "user" ? "authToken" : "authAdminToken";
    console.log('user?.role:', user?.role)

    //*------------- get token from cookies-------------
    const tokenFromCookies = Cookies.get(tokenName);
    console.log('tokenFromCookies:', tokenFromCookies)

    if (tokenFromCookies) {
      console.log("token stored in reducer")
      dispatch(setToken(tokenFromCookies));
    }

    if (!token) {
      console.log("token is not stored in reducer");
    }
  }, [dispatch, user, token]);

  useEffect(() => {
    if (token) {
      console.log('token:', token)
      Cookies.set("authToken", token, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      });
    }
  }, [token]);

  console.log("user?.role:", user?.role);
  console.log(" user?.isVerified:", user?.isVerified);
  console.log("  user?.isCompleted:", user?.isCompleted);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ---------------------------- user routes--------------------------- */}
          <Route path="/" element={<OnBoarding />} />
          {/* ---------------------------- authenticated routes------------------- */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={
                  user?.isVerified && user?.role === "user" ? true : false
                }
              />
            }
          >
            <Route path="/patient" element={<PatientsForm />} />
          </Route>

          <Route
            element={
              <ProtectedRoute
                isAuthenticated={
                  user?.isVerified && user?.isCompleted ? true : false
                }
              />
            }
          >
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/success" element={<Success />} />
          </Route>

          {/* --------------------- Admin routes------------------------------ */}
          {/* <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                admin={user?.role === "admin" ? true : false}
                adminOnly={true}
              />
            }
          >
          </Route> */}
          <Route path="/admin/dashboard/:docId" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
