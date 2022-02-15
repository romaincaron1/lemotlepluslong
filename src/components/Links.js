import React from "react";

const { ipcRenderer } = window.require("electron")

const Links = ({ handleRulesClick }) => {

  const handleQuitClick = () => {
    ipcRenderer.send('close-me');
  }

  return (
    <div className="links">
      <button className="link" onClick={handleQuitClick}>
        <i class="bx bx-x"></i>
      </button>
      <button className="link" onClick={handleRulesClick}>
        <i class="bx bx-book-open"></i>
      </button>
    </div>
  );
};

export default Links;
