import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../page/home";
import NodePanel from "../page/home/NodePanel";
import Edit from "../page/home/Edit";
import ErrorPage from "../page/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <NodePanel />,
      },
      {
        path: ":nodeId",
        children: [
          {
            path: "setting",
            element: <Edit />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage message={"Error"} />,
  },
  {
    path: "*",
    element: <ErrorPage message={"Page not found"} />,
  },
]);

const MainRoutes = () => {
  return <RouterProvider router={router} />;
};

export default MainRoutes;
