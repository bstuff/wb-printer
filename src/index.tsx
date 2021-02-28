import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/App";
import "./index.scss";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
