import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css";
// import "./index.css";
import App from "./App.jsx";
import { AdminProvider } from "./AdminProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <App />
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>
);
