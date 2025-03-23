import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "../src/context/AuthContext"; 
import theme from "../src/styles/ThemeSidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider> 
        <App />
    </AuthProvider>
  </React.StrictMode>
  
);

