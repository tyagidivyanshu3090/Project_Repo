import React from "react";

const LoginForm = () => {
  return (
    // Main container to center the form on the page
    <div className="flex h-screen items-center justify-center">
      {/* Form container with Netflix styling */}
      <form className="flex w-full max-w-md flex-col gap-4 rounded bg-black/75 p-16">
        {/*
          - `max-w-md`: Sets a maximum width for the form.
          - `flex flex-col gap-4`: Arranges the inputs and button vertically with a gap between them.
          - `bg-black/75`: The semi-transparent black background.
          - `p-16`: Adds generous padding inside the form.
        */}
        <h1 className="mb-4 text-3xl font-bold text-white">Sign In</h1>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Email or phone number"
          className="rounded bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        />
        {/*
          - `bg-gray-700`: The dark grey background for the input.
          - `p-3 text-white`: Padding and white text color.
          - `focus:*`: Styles that apply when the input is focused (clicked on).
        */}

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="rounded bg-gray-700 p-3 text-white placeholder-gray-400 "
        />

        {/* Sign In Button */}
        <button className="mt-6 rounded bg-red-600 p-3 font-bold text-white hover:bg-red-700">
          Sign In
        </button>
        {/*
          - `mt-6`: Adds margin to the top to create space.
          - `bg-red-600`: The classic Netflix red.
          - `hover:bg-red-700`: A slightly darker red on hover.
        */}

        {/* Helper text at the bottom */}
        <div className="mt-2 text-center text-gray-400">
          <a href="#" className="hover:underline">
            Need help?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
