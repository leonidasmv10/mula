import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GamePage from "./pages/GamePage";
import GameResultPage from "./pages/GameResultPage";
import GameSetupPage from "./pages/GameSetupPage";
import StatisticsPage from "./pages/StatisticsPage";
import RankingPage from "./pages/RankingPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game_result" element={<GameResultPage />} />
        <Route path="/game_setup" element={<GameSetupPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </>
  );
};

export default App;
