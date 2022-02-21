import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Links from "../components/Links";
import Rules from "../components/Rules";
import Pick from "../components/Pick";
import Word from "../components/Word";
import letters from "../data/letters.json";
import Player from "../entity/Player";
import { nameSplitter, pickRandomStarter } from "../functions/playFunctions";
import { topPos, leftPos } from "../data/positions.json";

const Play = () => {
  var { names } = useParams();
  names = nameSplitter(names);
  const time = 90;
  // Joueurs
  let firstPlayer = new Player(names[0], "star");
  let secondPlayer = new Player(names[1], "square");
  // Etats
  const [visibleRules, setVisibleRules] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(
    pickRandomStarter(firstPlayer, secondPlayer)
  );
  const [word, setWord] = useState([]);
  const [fValue, setfValue] = useState("");
  const [sValue, setsValue] = useState("");
  const [fTempWord, setfTempWord] = useState([]);
  const [sTempWord, setsTempWord] = useState([]);
  const [fValid, setfValid] = useState(0);
  const [sValid, setsValid] = useState(0);
  const [seconds, setSeconds] = useState(time);
  const [isActive, setIsActive] = useState(false);
  // 2 états -> pick et word
  const [gameState, setGameState] = useState("pick");
  const [fPlayerCase, setFPlayerCase] = useState(firstPlayer.case)
  const [sPlayerCase, setSPlayerCase] = useState(secondPlayer.case)
  // Nombre de tour
  const [nTours, setNTours] = useState(0);
  // Timer
  function toggle() {
    setIsActive(!isActive);
  }
  function reset() {
    setSeconds(time);
    setIsActive(false);
  }

  function resetRound() {
    setGameState("pick");
    setfValid(0);
    setsValid(0);
    setfValue("");
    setsValue("");
    setWord([]);
    reset();
    if (currentPlayer.name === firstPlayer.name) {
      setCurrentPlayer(secondPlayer);
    } else {
      setCurrentPlayer(firstPlayer);
    }
    setNTours((nTours) => nTours + 1);
  }

  useEffect(() => {
    if(seconds === 0) {
      if(fValue.length > 0) {
        setFPlayerCase((fPlayerCase) => fPlayerCase + 1);
      }
      if(sValue.length > 0) {
        setSPlayerCase((sPlayerCase) => sPlayerCase + 1);
      }
      resetRound();
    }
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  //Image du body
  useEffect(() => {
    document.body.className = "body-outside";
  });
  // Initialisation des tempWord
  useEffect(() => {
    if (word.length === 8) {
      word.forEach((letter) => {
        setfTempWord((fTempWord) => [...fTempWord, letter]);
        setsTempWord((sTempWord) => [...sTempWord, letter]);
        setIsActive(true);
      });
    }
  }, [word]);
  // Lorsque l'on confirme le mot saisie
  useEffect(() => {
    var motValidF = ""
    var motValidS = ""
    var phraseGagnant =""
    if (fValid === 1 && sValid === 1) {
      if(fValue.length > 0) {
        setFPlayerCase((fPlayerCase) => fPlayerCase + fValue.length);
        // Procéder à la vérification avec l'API
        motValidF = `Le joueur ${firstPlayer.name} a entré un mot valide : "${fValue}" d'une longeur de ${fValue.length}`
      }
      if(sValue.length > 0) {
        setSPlayerCase((sPlayerCase) => sPlayerCase + sValue.length);
        // Procéder à la vérification avec l'API
        motValidS = `Le joueur ${secondPlayer.name} a entré un mot valide : "${sValue}" d'une longeur de ${sValue.length}`
      }
      if (fValue.length > sValue.length) {
        phraseGagnant = `Le mot de ${firstPlayer.name} est le mot le plus long`
        alert(motValidF + "\n" + motValidS + "\n" + phraseGagnant)
      }
      else {
        phraseGagnant = `Le mot de ${secondPlayer.name} est le mot le plus long`
        alert(motValidF + "\n" + motValidS + "\n" + phraseGagnant)
      }
      resetRound();
    }

    
  }, [fValid, sValid]);

  const handleRulesClick = () => {
    setVisibleRules(!visibleRules);
  };

  const handleClick = (e) => {
    if (e.target.value === "consonne") {
      const randomConsonant =
        letters.consonants[
          Math.floor(Math.random() * letters.consonants.length)
        ];
      setWord((word) => [...word, randomConsonant]);
    } else if (e.target.value === "voyelle") {
      const randomVowel =
        letters.vowels[Math.floor(Math.random() * letters.vowels.length)];
      setWord((word) => [...word, randomVowel]);
    }

    if (word.length === 7) {
      setGameState("word");
    }
  };
  // Inputs changes
  const handleFChange = (e) => {
    console.log(fTempWord);
    // Bloquer la possibilité de supprimer avec la tour retour ou supprimer
    if (e.keyCode === 8 || e.keyCode === 46) {
      e.preventDefault();
    }
    const fullWord = e.target.value;
    const letter = fullWord[fullWord.length - 1];
    // Vérifier si la lettre entrée est contenu dans la série de lettre piochée
    if (fTempWord.includes(letter)) {
      const index = fTempWord.lastIndexOf(letter);
      fTempWord.splice(index, 1);
      setfValue(fullWord);
    }
  };
  const handleSChange = (e) => {
    // Bloquer la possibilité de supprimer avec la tour retour ou supprimer
    if (e.keyCode === 8 || e.keyCode === 46) {
      e.preventDefault();
    }
    const fullWord = e.target.value;
    const letter = fullWord[fullWord.length - 1];
    // Vérifier si la lettre entrée est contenu dans la série de lettre piochée
    if (sTempWord.includes(letter)) {
      const index = sTempWord.lastIndexOf(letter);
      sTempWord.splice(index, 1);
      setsValue(fullWord);
    }
  };
  // Submit buttons
  const handleFSubmit = (e) => {
    setfValid(1);
    e.target.style.visibility = "hidden";
  };
  const handleSSubmit = (e) => {
    setsValid(1);
    e.target.style.visibility = "hidden";
  };
  // Resets
  const handleFreset = () => {
    setfValue("");
    setfTempWord([]);
    word.forEach((letter) => {
      setfTempWord((fTempWord) => [...fTempWord, letter]);
    });
  };
  const handleSreset = () => {
    setsValue("");
    setsTempWord([]);
    word.forEach((letter) => {
      setsTempWord((sTempWord) => [...sTempWord, letter]);
    });
  };

  // Déplacements
  const [fPos, setFPos] = useState({});
  useEffect(() => {
    setFPos({top: topPos[fPlayerCase] + "px", left: leftPos[fPlayerCase] + "px"});
    if(fPlayerCase === 18) {
      setFPlayerCase(0);
    }
  }, [fPlayerCase])

  const [sPos, setSPos] = useState({});
  useEffect(() => {
    setSPos({top: topPos[sPlayerCase] + "px", left: leftPos[sPlayerCase] + "px"});
    if(sPlayerCase === 18) {
      setSPlayerCase(0);
    }
  }, [sPlayerCase])

  return (
    <div className="play-page">
      <Links handleRulesClick={handleRulesClick} />
      <Rules visibleRules={visibleRules} handleRulesClick={handleRulesClick} />
      <div className="play-container">
        <div className="game">
          <div className="top">
            <span>
              TOUR (n°{nTours}):
              <span className="tour">{currentPlayer.getSymbolHref()}</span>
            </span>
            <span>TIMER : {seconds}</span>
          </div>
          <div className="board">
            <span className="star" style={fPos}>{firstPlayer.getSymbolHref()}</span>
            <span className="square-symbol" style={sPos}>{secondPlayer.getSymbolHref()}</span>
            <div className="first-line">
              <div className="square" id="1" />
              <div className="square" id="2" />
              <div className="square" id="3" />
              <div className="square" id="4" />
              <div className="square" id="5" />
              <div className="square" id="6" />
              <div className="square" id="7" />
            </div>
            <div className="second-line">
              <div className="square" id="8" />
              <div className="square" id="9" />
            </div>
            <div className="third-line">
              <div className="square" id="10" />
              <div className="square" id="11" />
            </div>
            <div className="fourth-line">
              <div className="square" id="12" />
              <div className="square" id="13" />
              <div className="square" id="14" />
              <div className="square" id="15" />
              <div className="square" id="16" />
              <div className="square" id="17" />
              <div className="square" id="18" />
            </div>
          </div>
          <div className="bot">
            <span className="word">{word}</span>
          </div>
        </div>
        <div className="players">
          <div className="names">
            <div className="versus">
              <span>{firstPlayer.name}</span>
              <span>VS</span>
              <span>{secondPlayer.name}</span>
            </div>
            <div className="symbols">
              <span>
                <i class="bx bx-star"></i>
              </span>
              <span>
                <i class="bx bx-square"></i>
              </span>
            </div>
          </div>
          <div className="player-box">
            <div className="top">
              <h3>{firstPlayer.name}</h3>
              <span>{firstPlayer.tokens}/3 JETONS</span>
            </div>
            {gameState === "pick" ? (
              currentPlayer.name === firstPlayer.name ? (
                <Pick handleClick={handleClick} />
              ) : (
                <div className="space" />
              )
            ) : (
              <Word
                handleChange={handleFChange}
                handleSubmit={handleFSubmit}
                value={fValue}
                handleReset={handleFreset}
              />
            )}
          </div>
          <div className="player-box">
            <div className="top">
              <h3>{secondPlayer.name}</h3>
              <span>{secondPlayer.tokens}/3 JETONS</span>
            </div>
            {gameState === "pick" ? (
              currentPlayer.name === secondPlayer.name ? (
                <Pick handleClick={handleClick} />
              ) : (
                <div className="space" />
              )
            ) : (
              <Word
                handleChange={handleSChange}
                handleSubmit={handleSSubmit}
                value={sValue}
                handleReset={handleSreset}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
