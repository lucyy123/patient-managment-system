import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import ProtectedRoute from "./utils/protectedRoutes";
import { UserReducerInitialState } from "./vite-env";

//*-------- normal imports--------------------

//*-------- lazy imports--------------------

const OnBoarding = lazy(() => import("./pages/OnBoarding"));
const PatientsForm = lazy(() => import("./pages/PatientsForm"));
const Appointment = lazy(() => import("./pages/Appointment"));
const Success = lazy(() => import("./pages/Success"));

//!-------------------------- admin imports----------------------------
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));

const App = () => {
  // todo: Implemention of token validation for redirection of user between home and appointment pages
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if the token is present in the cookies
  //   const token = Cookies.get('authToken');

  //   if (token) {
  //     // You can optionally validate the token by making an API call
  //     // Example: axios.get('/validate-token', { headers: { Authorization: `Bearer ${token}` } });

  //     // If token is valid, navigate to the appointment page
  //     navigate('/appointment');
  //   } else {
  //     // If no token, ensure user stays on the home page (or login page)
  //     navigate('/home');
  //   }
  // }, [navigate]);



  
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* ---------------------------- user routes--------------------------- */}
          <Route path= "/" element={<OnBoarding />} />
          {/* ---------------------------- authenticated routes------------------- */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={user?.isVerified && user?.role==='user' ? true : false}
              />
            }
          >
            <Route path="/patient" element={<PatientsForm />} />
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
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
