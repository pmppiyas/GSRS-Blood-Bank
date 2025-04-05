import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import ErrorPage from "../Components/ErrorPage";
import Home from "../Components/Home";
import Dashboard from "../Components/Dashboard/Dashboard";
import EventPage from "../Components/Event/EventPage";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import DonarPage from "../Components/Donar/DonarPage";
import AboutPage from "../Components/About/AboutPage";
import ContactPage from "../Components/Contact/ContactPage";
import PrivetRoute from "./PrivetRoute";

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
        element: (
          <PrivetRoute>
            <Dashboard></Dashboard>
          </PrivetRoute>
        ),
      },
      {
        path: "donar",
        element: <DonarPage></DonarPage>,
      },
      {
        path: "donar/:id",
        element: (
          <PrivetRoute>
            <h2>hh</h2>
          </PrivetRoute>
        ),
      },
      {
        path: "events",
        element: <EventPage></EventPage>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "contact",
        element: <ContactPage></ContactPage>,
      },
    ],
  },
]);

export default router;
