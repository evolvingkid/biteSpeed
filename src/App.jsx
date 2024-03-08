import { Fragment } from "react";
import MainRoutes from "./router/index.route";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Fragment>
      <MainRoutes />
      <Toaster position="top-center" toastOptions={{className: 'toast-error', duration: 30000}} />
    </Fragment>
  );
};

export default App;
