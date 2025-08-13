import React from "react";
import Header from "../../components/Header";
import AuthForm from "./AuthForm";

const Login = () => {
  const backgroundImageUrl =
    "https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_medium.jpg";

  return (
    // The <img> tag is removed
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`, // Set the background image URL
        backgroundSize: "cover", // Ensure it covers the whole div
        backgroundPosition: "center", // Center the image
        height: "100vh", // Make the div take up the full screen height
        width: "100vw", // Make the div take up the full screen width
      }}
    >
      <Header />
      {/* Your login form will go here */}
      <AuthForm />
    </div>
  );
};

export default Login;
