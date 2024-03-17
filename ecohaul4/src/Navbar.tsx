import React from 'react';
import './Navbar.css'; // Assuming you have a separate CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Your Items</div>
      <ul className="nav-links">
        <li><a href="/">Bought</a></li>
        <li><a href="/about">Sold</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;