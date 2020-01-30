import React from "react";
import "../style/Navbar.scss";

export default function Navbar() {
  return (
    <nav>
      <h1>CAT fact</h1>
      <ul>
        <li>Connexion</li>
        <li>
          <img
            alt="Menu"
            src="../images/icons8-gear-64.png"
            className="dropDownMenu"
          />
        </li>
      </ul>
    </nav>
  );
}
