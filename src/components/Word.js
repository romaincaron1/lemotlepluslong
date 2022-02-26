import React from "react";

const Word = ({ handleChange, handleSubmit, value, handleReset, visibility }) => {
  return (
    <div className="word-bloc">
      <input
        type="password"
        value={value}
        onChange={handleChange}
        placeholder="ENTREZ VOTRE MOT"
        disabled={visibility ? false : true}
      />
      <div className="word-buttons">
        <button className="submit" style={visibility ? {} : {display: "none"}} onClick={handleSubmit}>CONFIRMER</button>
        <button className="reset" style={visibility ? {} : {display: "none"}} onClick={handleReset}><i class='bx bx-reset'></i></button>
      </div>
    </div>
  );
};

export default Word;
