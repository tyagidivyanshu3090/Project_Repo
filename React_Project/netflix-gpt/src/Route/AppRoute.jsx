import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../features/authPages/LoginPage";

const AppRoute = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default AppRoute;
