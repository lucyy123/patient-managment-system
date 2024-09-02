import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";

//*-------- normal imports--------------------

//*-------- lazy imports--------------------

const OnBoarding = lazy(() => import("./pages/OnBoarding"));
const PatientsForm = lazy(()=>import('./pages/PatientsForm'));
const Appointment = lazy(()=>import('./pages/Appointment'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<OnBoarding />}/>
          <Route path="/patient" element={<PatientsForm />}/>
          <Route path="/appointment" element={<Appointment />}/>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
