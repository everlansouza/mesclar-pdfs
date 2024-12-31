import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;