import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import ErrorPage from "../Components/ErrorPage";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard/Dashboard";
import EventPage from "../Components/Event/EventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "events",
        element: <EventPage></EventPage>,
      },
    ],
  },
]);

export default router;
