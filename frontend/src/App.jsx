import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gadgets from "./pages/Gadgets";
import GadgetDetails from "./pages/GadgetDetails";

function App() {
  return (
    <>
      <Navbar />

      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gadgets" element={<Gadgets />} />
          <Route path="/gadgets/:id" element={<GadgetDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;