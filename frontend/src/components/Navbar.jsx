import React from "react";

export default function Navbar() {
  return (
    <nav>
      <h1>Is this a joke ?</h1>

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
