import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
 const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">LIUSPORTSTRACK</div>
        <button 
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/board" className="hover:underline">Board</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col mt-3 space-y-2 md:hidden">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/board" className="hover:underline">Board</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      )}
    </nav>
  );
}
export default Navbar