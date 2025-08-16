import React from "react";
import AppRoute from "./route/AppRoute";
import { Provider } from "react-redux";
import appStore from "./utils/redux-store/appStore";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <AppRoute />
      </Provider>
    </>
  );
};

export default App;
