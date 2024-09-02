import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loader from "./Components/Loader";

//*-------- normal imports--------------------

//*-------- lazy imports--------------------

const OnBoarding = lazy(() => import("./pages/OnBoarding"));
const PatientsForm = lazy(()=>import('./pages/PatientsForm'))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<OnBoarding />}/>
          <Route path="/patient" element={<PatientsForm />}/>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
