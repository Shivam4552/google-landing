// src/App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import EnrollModal from "./components/EnrollModal";
import Footer from "./components/Footer";
import ThankYou from "./components/ThankYou";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        {/* Logo/Header remains at the top */}
        <Header />
        {/* Banner image below logo/header is removed */}
        <main className="flex-1 pt-0">
          <div className="max-w-4xl mx-auto px-2">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection onEnrollClick={() => setShowModal(true)} />
                    {showModal && <EnrollModal onClose={() => setShowModal(false)} />}
                  </>
                }
              />
              <Route path="/thankyou" element={<ThankYou />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
