import React from "react";

const Word = ({ handleChange, handleSubmit, value, handleReset }) => {
  return (
    <div className="word-bloc">
      <input
        type="password"
        value={value}
        onChange={handleChange}
        placeholder="ENTREZ VOTRE MOT"
      />
      <div className="word-buttons">
        <button className="submit" onClick={handleSubmit}>CONFIRMER</button>
        <button className="reset" onClick={handleReset}><i class='bx bx-reset'></i></button>
      </div>
    </div>
  );
};

export default Word;
