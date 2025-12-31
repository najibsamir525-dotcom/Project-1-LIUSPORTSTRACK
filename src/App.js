import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Board from './components/Board';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <div className="flex-grow">
          {!user ? (
            <Login setUser={setUser} />
          ) : (
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/about" Component={About} />
              <Route path="/contact" Component={Contact} />
              <Route path="/board" Component={Board} />
            </Routes>
          )}
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
