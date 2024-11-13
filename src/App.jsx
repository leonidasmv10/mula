import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import withAuth from "./hoc/withAuth";

const UnauthorizedPageWithAuth = withAuth(UnauthorizedPage)('admin');

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<UnauthorizedPageWithAuth />} />
      </Routes>
    </>
  );
};

export default App;
