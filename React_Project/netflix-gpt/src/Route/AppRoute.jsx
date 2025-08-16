import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../features/authPages/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";

const AppRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user?.email);
        // If user is authenticated, dispatch setUser action
        // dispatch(setUser({ email: user }));
      } else {
        // If no user is authenticated, dispatch clearUser action
        // appStore.dispatch({ type: "user/clearUser" });
      }
    });
  }, []);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default AppRoute;
