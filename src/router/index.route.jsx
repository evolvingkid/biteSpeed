import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../page/home";
import NodePanel from "../page/home/NodePanel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <NodePanel />,
      },
    ],
  },
]);

const MainRoutes = () => {
  return <RouterProvider router={router} />;
};

export default MainRoutes;
