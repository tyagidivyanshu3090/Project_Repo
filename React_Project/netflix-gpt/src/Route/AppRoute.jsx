import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../features/authPages/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../utils/redux-store/slice/UserSlice";

import Dashboard from "../features/DashboardPage/Dashboard";

const AppRoute = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user);
        // Dispatch an action to set the user in the Redux store
        // If user is authenticated, dispatch setUser action
        dispatch(
          setUser({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
          })
        );
      } else {
        // If no user is authenticated, dispatch clearUser action
        dispatch(clearUser());
        console.log("No user is authenticated");
      }
    });
  }, []);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default AppRoute;
