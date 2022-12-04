import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user }) {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <nav>
        <Link to="/profile">My Personal Space</Link>
      </nav>
      <nav>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}

export default NavBar;
