import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/Header.css";

function Header({ songs = [] }) {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <span className="logo-text">Chord Finder</span>
          </Link>
        </div>

        <div className="search-container">
          <SearchBar songs={songs} />
        </div>

        <nav className="main-nav">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Songs</Link>
            </li>
            <li className={location.pathname === "/favorites" ? "active" : ""}>
              <Link to="/favorites">Favorites</Link>
            </li>
            <li className={location.pathname === "/editor" ? "active" : ""}>
              <Link to="/editor">Add Song</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
