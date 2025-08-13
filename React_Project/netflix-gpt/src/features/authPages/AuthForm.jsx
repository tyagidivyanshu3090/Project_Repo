import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = () => {
  // RENAMED: 'formState' to 'isLoginMode' for better clarity.
  // 'true' means the Login form is active, 'false' means Sign Up is active.
  const [isLoginMode, setIsLoginMode] = useState(true);

  // RENAMED: Corrected typo "Hanlder" to "Handler" and made the name more specific.
  const toggleAuthModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode); // Using a function ensures we get the latest state
  };

  return (
    // Main container to center the form on the page
    <div className="flex h-screen items-center justify-center ">
      {/* Form container with Netflix styling */}
      <form
        // Using onSubmit to prevent default browser form submission behavior
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full max-w-md flex-col gap-4 rounded bg-black/70 p-16"
      >
        <h1 className="mb-4 text-3xl font-bold text-white">
          {/* CORRECTED: Text now dynamically changes */}
          {isLoginMode ? "Login" : "Sign Up"}
        </h1>

        {/* This input for the user's name will only appear in "Sign Up" mode */}
        {!isLoginMode && (
          <input
            type="text"
            placeholder="Your Name"
            className="rounded bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          />
        )}

        <input
          type="email" // Using type="email" for better validation
          placeholder="Email or phone number"
          className="rounded bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="rounded bg-gray-700 p-3 text-white placeholder-gray-400"
        />

        <button className="mt-6 rounded bg-red-600 p-3 font-bold text-white hover:bg-red-700">
          {/* CORRECTED: Consistent capitalization and dynamic text */}
          {isLoginMode ? "Login" : "Sign Up"}
        </button>

        <div className="flex justify-between mt-2 text-center text-gray-400">
          <Link to="#" className="hover:underline text-sm">
            Need help?
          </Link>

          {/* IMPROVED: The toggle text is now more descriptive and user-friendly */}
          <p className="text-sm">
            {isLoginMode ? "New to Netflix? " : "Already have an account? "}
            <span
              className="cursor-pointer font-bold text-white hover:underline"
              onClick={toggleAuthModeHandler}
            >
              {isLoginMode ? "Sign up now." : "Login now."}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
