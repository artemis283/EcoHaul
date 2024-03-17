import React from 'react';
import './Navbar.css'; // Assuming you have a separate CSS file for styling

function Navbar({setBought}) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Your Items</div>
      <ul className="nav-links">
        <li><a onClick={setBought(true)}>Bought</a></li>
        <li><a onClick={setBought(false)}>Sold</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;