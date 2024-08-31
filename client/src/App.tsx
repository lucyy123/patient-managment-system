import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./Components/Loader";

//*-------- normal imports--------------------

//*-------- lazy imports--------------------

const OnBoarding = lazy(() => import("./pages/OnBoarding"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<OnBoarding />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
