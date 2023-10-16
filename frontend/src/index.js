import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import "bulma/css/bulma.css";
import axios from "axios";
axios.defaults.withCredentials = true;

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
