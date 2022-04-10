import React from "react";

const { ipcRenderer } = window.require("electron")

const Links = ({ handleRulesClick }) => {

  const handleQuitClick = () => {
    ipcRenderer.send('close-me');
  }

  return (
    <div className="links">
      <button className="link" onClick={handleQuitClick}>
        <i className="bx bx-x"></i>
      </button>
      <button className="link" onClick={handleRulesClick}>
        <i className="bx bx-book-open"></i>
      </button>
    </div>
  );
};

export default Links;
