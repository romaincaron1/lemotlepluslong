import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Links from "../components/Links";
import Rules from "../components/Rules";

function Home() {
  const [visibleRules, setVisibleRules] = useState(false);
  const [firstName, setFirstName] = useState("Joueur1");
  const [secondName, setSecondName] = useState("Joueur2");
  const [link, setLink] = useState("")

  useEffect(() => {
    //Image du body
    document.body.className = "body-home";
    //Noms par défaut injectés dans le lien vers la page play
    setLink("/play/:" + firstName + "&" + secondName);
  });

  const handleRulesClick = () => {
    setVisibleRules(!visibleRules)
  }

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value)
    setLink("/play/:" + firstName + "&" + secondName);
  }

  const handleChangeSecondName = (e) => {
    setSecondName(e.target.value)
    setLink("/play/:" + firstName + "&" + secondName);
  }

  return (
    <div className="home">
      <Links handleRulesClick={handleRulesClick} />
      <Rules visibleRules={visibleRules} handleRulesClick={handleRulesClick} />
      <div className="title">
        <h1>LE MOT LE PLUS LONG</h1>
      </div>
      <div className="inputs">
        <input
          type="text"
          className="input"
          placeholder="ENTREZ LE NOM DU JOUEUR N°1"
          onChange={handleChangeFirstName}
        />
        <input
          type="text"
          className="input"
          placeholder="ENTREZ LE NOM DU JOUEUR N°2"
          onChange={handleChangeSecondName}
        />
      </div>
      <div className="buttons">
        <Link to={link} className="link play">JOUER</Link>
        <button className="link" onClick={handleRulesClick}>
          <i class="bx bx-book-open"></i>
        </button>
      </div>
    </div>
  );
}

export default Home;
