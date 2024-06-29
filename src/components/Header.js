import React from "react";

function Header() {
  return (
    <header className="App-header">
      <h1>📓 Note web</h1>
      <nav>
        <ul>
          <li>
            <a href="http://localhost:3000/?" style={{ marginRight: "10px" }}>
              Home
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
