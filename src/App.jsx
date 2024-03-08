import { Fragment } from "react";
import MainRoutes from "./router/index.route";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Fragment>
      <MainRoutes />
      <Toaster position="top-center"  />
    </Fragment>
  );
};

export default App;
