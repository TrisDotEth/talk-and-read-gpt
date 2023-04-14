import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: fixed;
  left: 50%;
  top: 0;
  width: 300px;
  height: 30vh;
  background: #eeeeee;
  border-right: 1px solid #c2c2c2;
  z-index: 999999999;
  }
`;
document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
