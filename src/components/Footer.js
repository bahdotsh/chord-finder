import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Chord Finder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
