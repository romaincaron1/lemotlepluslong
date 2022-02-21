import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Links from "../components/Links";
import Rules from "../components/Rules";

function Home() {
  const [visibleRules, setVisibleRules] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [link, setLink] = useState("")
  const [error, setError] = useState("");

  useEffect(() => {
    //Image du body
    document.body.className = "body-home";
  })

  useEffect(() => {
    //Vérification des pseudonymes
    if(firstName !== "" && secondName !== "") {
      if(firstName.toUpperCase() !== secondName.toUpperCase()) {
        if(firstName.length <= 10 && secondName.length <= 10) {
          setLink("/play/:" + firstName + "&" + secondName);
          setError("");
        } else {
          setLink("/");
          setError("La taille du pseudonyme doit-être inférieur à 10 caractères.");
        }
      } else {
        setLink("/");
        setError("Les deux pseudonymes doivent être différents.");
      }
    } else {
      setLink("/play/:" + (firstName !== "" ? firstName : "Joueur1") + "&" + (secondName !== "" ? secondName : "Joueur2"));
    }
  }, [firstName, secondName]);

  const handleRulesClick = () => {
    setVisibleRules(!visibleRules)
  }

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const handleChangeSecondName = (e) => {
    setSecondName(e.target.value)
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
          value={firstName}
          onChange={handleChangeFirstName}
        />
        <input
          type="text"
          className="input"
          placeholder="ENTREZ LE NOM DU JOUEUR N°2"
          value={secondName}
          onChange={handleChangeSecondName}
        />
        <div className="errors">
          <span>{error}</span>
        </div>
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
