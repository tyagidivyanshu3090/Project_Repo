import React from "react";
import NetFlix_Logo from "../../assets/Netflix_Logo.png";

const Header = () => {
  return (
    // Main header container
    // - `absolute`: Positions it over the background content
    // - `z-10`: Ensures it stays on top of other elements
    // - `w-full`: Makes it take the full width of the screen
    // - `flex items-center justify-between`: The core layout; creates a flex row, vertically centers items, and pushes the logo and actions apart
    // - `p-4 sm:p-6`: Adds padding, which is larger on bigger screens (sm:)
    <header className="absolute z-10 w-full flex items-center justify-between p-4 sm:p-6">
      {/* - `w-24 sm:w-36`: Sets the width of the logo, making it larger on bigger screens */}
      <img className="w-24 sm:w-36" src={NetFlix_Logo} alt="Netflix Logo" />

      {/* Actions container (for the right side) */}
      {/* - `flex items-center gap-4`: Creates a flex row for the dropdown and button, with a gap between them */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative">
          <select className="bg-black/40 text-white border border-gray-500 rounded px-5 py-1.5 appearance-none">
            {/* - `bg-black/40`: Black background with 40% opacity
              - `border border-gray-500`: Gray border
              - `px-5 py-1.5`: Horizontal and vertical padding
              - `appearance-none`: Removes default browser styling for the select dropdown
            */}
            <option>English</option>
            <option>Hindi</option>
          </select>
          {/* You can add a custom dropdown arrow icon here later */}
        </div>

        {/* Sign In Button */}
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-4 py-1.5 transition-colors">
          {/*
            - `bg-red-600`: The main Netflix red color
            - `hover:bg-red-700`: A slightly darker red on hover
            - `font-semibold`: Makes the text bold
            - `transition-colors`: Smoothly animates the color change on hover
          */}
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
