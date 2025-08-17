import React from "react";
import NetFlix_Logo from "../../assets/Netflix_Logo.png";
import User_Avatar from "../../assets/User_Avatar.png"; // A placeholder user avatar
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { clearUser } from "../../utils/redux-store/slice/UserSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const BrowseHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Assuming you have useNavigate imported from react-router-dom

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Dispatching is handled within the .then() block, which is correct.
        dispatch(clearUser());
        navigate("/");
      })
      .catch((error) => {
        // Good practice to have error handling.
        console.log("Error signing out:", error);
      });
  };

  return (
    // Use a <header> tag for semantic HTML.
    // 'absolute' positions it over the content below.
    <header className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img className="w-44" src={NetFlix_Logo} alt="Netflix Logo" />

      {/* Container for user actions */}
      <div className="flex items-center gap-4">
        <img
          className="w-10 h-10 rounded"
          src={User_Avatar}
          alt="User Avatar"
        />
        <button
          onClick={signOutHandler}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default BrowseHeader;
