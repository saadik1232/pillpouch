import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/sass/healthcare.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; // react loader

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import { Provider } from "react-redux";
import { persistor, store } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";

//import "bootstrap/dist/css/bootstrap.min.css";

//import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap
//import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.bundle";
//import "bootstrap/dist/js/bootstrap.bundle.min";

console.log("useeffect in App.js");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>

    {/* <Provider store={store}>
      <App />
    </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
