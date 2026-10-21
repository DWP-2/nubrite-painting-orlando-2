import React from "react";
import ReactDOM from "react-dom/client";
import { AnimaProvider } from "@animaapp/playground-react-sdk";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <AnimaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AnimaProvider>
  </React.StrictMode>,
);
