import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gadgets from "./pages/Gadgets";
import GadgetDetails from "./pages/GadgetDetails";
import Recommendations from "./pages/Recommendations";
import Compare from "./pages/Compare";


function App() {
  return (
    <div className="app-shell">

      <Navbar />

      <main className="main-container">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/gadgets"
            element={<Gadgets />}
          />

          <Route
            path="/gadgets/:id"
            element={<GadgetDetails />}
          />

          <Route
            path="/recommend"
            element={<Recommendations />}
          />

          <Route
            path="/compare"
            element={<Compare />}
          />

        </Routes>

      </main>

    </div>
  );
}


export default App;