import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import Links from "../components/Links";
import Rules from "../components/Rules";
import Pick from "../components/Pick";
import Word from "../components/Word";
import letters from "../data/letters.json";
import Player from "../entity/Player";
import { pickRandomStarter } from "../functions/playFunctions";
import { topPos, leftPos } from "../data/positions.json";
import { createThree, getLongestWord, verifyWord } from "../data/dictionnary";

const Pve = ({ names }) => {
	const alert = useAlert();
	const history = useHistory();
	useEffect(() => {
		createThree();
	}, []);
	const tours = 3;
	const time = 90;
	// Joueurs
	let firstPlayer = new Player(names[0], "star");
	let secondPlayer = new Player(names[1], "square");
	// Etats
	const [visibleRules, setVisibleRules] = useState(false);
	const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
	const [word, setWord] = useState([]);
	const [fValue, setfValue] = useState("");
	const [sValue, setsValue] = useState("");
	const [fNbCases, setFnbCases] = useState(0);
	const [sNbCases, setSnbCases] = useState(0);
	const [fTempWord, setfTempWord] = useState([]);
	const [fValid, setfValid] = useState(0);
	const [sValid, setsValid] = useState(0);
	const [seconds, setSeconds] = useState(time);
	const [isActive, setIsActive] = useState(false);
	const [isFVisible, setIsFVisible] = useState(true);
	const [consonants, setConsonants] = useState(letters.consonants);
	const [vowels, setVowels] = useState(letters.vowels);
	const [blackCaseState, setBlackState] = useState(true);
	const [fPlayerOnBlackCase, setFplayerOnBlackCase] = useState(false);
	const [sPlayerOnBlackCase, setSplayerOnBlackCase] = useState(false);
	// 2 états -> pick et word
	const [gameState, setGameState] = useState("pick");
	const [fPlayerCase, setFPlayerCase] = useState(firstPlayer.case);
	const [sPlayerCase, setSPlayerCase] = useState(secondPlayer.case);
	const [fTokens, setFtokens] = useState(firstPlayer.tokens);
	const [sTokens, setStokens] = useState(secondPlayer.tokens);
	// Nombre de tour
	const [nTours, setNTours] = useState(-1);
	// Timer
	const resetTimer = () => {
		setSeconds(time);
		setIsActive(false);
	};

	const resetRound = () => {
		setGameState("pick");
		setBlackState(true);
		setIsFVisible(true);
		setFplayerOnBlackCase(false);
		setSplayerOnBlackCase(false);
		setfValid(0);
		setsValid(0);
		setFnbCases(0);
		setSnbCases(0);
		setfValue("");
		setsValue("");
		setConsonants(letters.consonants);
		setVowels(letters.vowels);
		setWord([]);
		setNTours((nTours) => nTours + 1);
		resetTimer();
	};

	const blackCasePhase = (player) => {
		if (player === firstPlayer) {
			setGameState("pick");
			setBlackState(false);
			var letter;
			if (word.length === 7) {
				letter = word.splice(Math.floor(Math.random() * word.length), 1);
				alert.show(
					<div className="alert-bloc">
						<p>Un joueur est tombé sur une case noire !</p>
						<p>
							La lettre <span className="important-word">{letter}</span> a été retirée
							du jeu !
						</p>
					</div>
				);
			}
			resetTimer();
			if (player === firstPlayer) {
				setCurrentPlayer(firstPlayer);
				setIsFVisible(true);
				setfValue("");
				setfValid(0);
				setfTempWord("");
			} else {
				setCurrentPlayer(secondPlayer);
			}
		} else {
			setsValid(2);
			if (Math.floor(Math.random() * 2 === 1)) {
				setsValue("");
			}
		}
	};

	useEffect(() => {
		if (seconds === 0) {
			setfValid(1);
			setsValid(1);
		}
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				setSeconds((seconds) => seconds - 1);
			}, 1000);
		} else if (!isActive && seconds !== 0) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isActive, seconds]);

	//Image du body
	useEffect(() => {
		document.body.className = "body-outside";
	}, []);
	// Initialisation des tempWord
	useEffect(() => {
		if (word.length === 7) {
			word.forEach((letter) => {
				setfTempWord((fTempWord) => [...fTempWord, letter]);
				setIsActive(true);
			});
			if(getLongestWord(word)) {
				setsValue(getLongestWord(word));
			} else {
				setsValue("");
			}
		}
	}, [word]);
	// Déplacement des pions + placement aux extrémités si les deux pions sont sur la même case
	const movePawn = () => {
		if (sPlayerCase === fPlayerCase) {
			setFPos({
				top: "calc(" + topPos[fPlayerCase] + "px + 13px)",
				left: "calc(" + leftPos[fPlayerCase] + "px + 13px)",
			});
			setSPos({
				top: "calc(" + topPos[sPlayerCase] + "px - 13px)",
				left: "calc(" + leftPos[sPlayerCase] + "px - 13px)",
			});
		} else {
			setFPos({
				top: topPos[fPlayerCase] + "px",
				left: leftPos[fPlayerCase] + "px",
			});
			setSPos({
				top: topPos[sPlayerCase] + "px",
				left: leftPos[sPlayerCase] + "px",
			});
		}
	};
	// Lorsque l'on confirme le mot saisie
	useEffect(() => {
		if (!fPlayerOnBlackCase && !sPlayerOnBlackCase) {
			if (fValid === 1 && sValid === 1) {
				// Phrases par défaut
				var fValidWordSentence = (
					<p>
						Le mot entré par{" "}
						<span className="important-word">{firstPlayer.name}</span> n'est pas
						valide.
					</p>
				);
				var sValidWordSentence = (
					<p>
						Le mot entré par{" "}
						<span className="important-word">{secondPlayer.name}</span> n'est pas
						valide.
					</p>
				);
				var winnerSentence = <p>Personne n'avance.</p>;
				if (verifyWord(fValue)) {
					if (verifyWord(sValue)) {
						if (fValue.length > sValue.length) {
							if (fPlayerCase + fValue.length > 18) {
								setFPlayerCase(fPlayerCase + fValue.length - 18);
								setFtokens(fTokens + 1);
							} else {
								setFPlayerCase((fPlayerCase) => fPlayerCase + fValue.length);
							}
							winnerSentence = (
								<p>
									Le mot de <span className="important-word">{firstPlayer.name}</span>{" "}
									est le plus long ! Il avance donc de{" "}
									<span className="important-word">{fValue.length}</span> case(s).
								</p>
							);
						}
						fValidWordSentence = (
							<p>
								Le joueur <span className="important-word">{firstPlayer.name}</span> a
								entré un mot valide : <span className="important-word">{fValue}</span>{" "}
								d'une longueur de{" "}
								<span className="important-word">{fValue.length}</span>.
							</p>
						);
					} else {
						if (fPlayerCase + fValue.length > 18) {
							setFPlayerCase(fPlayerCase + fValue.length - 18);
							setFtokens(fTokens + 1);
						} else {
							setFPlayerCase((fPlayerCase) => fPlayerCase + fValue.length);
						}
						winnerSentence = (
							<p>
								Le mot de <span className="important-word">{firstPlayer.name}</span> est
								le plus long ! Il avance donc de{" "}
								<span className="important-word">{fValue.length}</span> case(s).
							</p>
						);
					}
				}

				if (verifyWord(sValue)) {
					if (verifyWord(fValue)) {
						if (sValue.length > fValue.length) {
							if (sPlayerCase + sValue.length > 18) {
								setSPlayerCase(sPlayerCase + sValue.length - 18);
								setStokens(sTokens + 1);
							} else {
								setSPlayerCase((sPlayerCase) => sPlayerCase + sValue.length);
							}
							winnerSentence = (
								<p>
									Le mot de <span className="important-word">{secondPlayer.name}</span>{" "}
									est le plus long ! Il avance donc de{" "}
									<span className="important-word">{sValue.length}</span> case(s).
								</p>
							);
						}
						sValidWordSentence = (
							<p>
								Le joueur <span className="important-word">{secondPlayer.name}</span> a
								entré un mot valide : <span className="important-word">{sValue}</span>{" "}
								d'une longueur de{" "}
								<span className="important-word">{sValue.length}</span>.
							</p>
						);
					} else {
						if (sPlayerCase + sValue.length > 18) {
							setSPlayerCase(sPlayerCase + sValue.length - 18);
							setStokens(sTokens + 1);
						} else {
							setSPlayerCase((sPlayerCase) => sPlayerCase + sValue.length);
						}
						winnerSentence = (
							<p>
								Le mot de <span className="important-word">{secondPlayer.name}</span>{" "}
								est le plus long ! Il avance donc de{" "}
								<span className="important-word">{sValue.length}</span> case(s).
							</p>
						);
						sValidWordSentence = (
							<p>
								Le joueur <span className="important-word">{secondPlayer.name}</span> a
								entré un mot valide : <span className="important-word">{sValue}</span>{" "}
								d'une longueur de{" "}
								<span className="important-word">{sValue.length}</span>.
							</p>
						);
					}
				}
				if (
					verifyWord(fValue) &&
					verifyWord(sValue) &&
					fValue.length === sValue.length &&
					fValue !== "" &&
					sValue !== ""
				) {
					if (fPlayerCase + fValue.length > 18) {
						setFPlayerCase(fPlayerCase + fValue.length - 18);
						setFtokens(fTokens + 1);
					} else {
						setFPlayerCase((fPlayerCase) => fPlayerCase + fValue.length);
					}
					if (sPlayerCase + sValue.length > 18) {
						setSPlayerCase(sPlayerCase + sValue.length - 18);
						setStokens(sTokens + 1);
					} else {
						setSPlayerCase((sPlayerCase) => sPlayerCase + sValue.length);
					}
					fValidWordSentence = (
						<p>
							Le joueur <span className="important-word">{firstPlayer.name}</span> a
							entré un mot valide : <span className="important-word">{fValue}</span>{" "}
							d'une longueur de <span className="important-word">{fValue.length}</span>
							.
						</p>
					);
					sValidWordSentence = (
						<p>
							Le joueur <span className="important-word">{secondPlayer.name}</span> a
							entré un mot valide : <span className="important-word">{sValue}</span>{" "}
							d'une longueur de <span className="important-word">{sValue.length}</span>
							.
						</p>
					);
					winnerSentence = (
						<p>
							Les deux mots sont de même longueur ! Les deux joueurs avancent de{" "}
							<span className="important-word">{fValue.length}</span> et{" "}
							<span className="important-word">{sValue.length}</span> case(s).
						</p>
					);
				}
				if (fValue.length === 0) {
					resetRound();
				}
				if (!verifyWord(fValue) && !verifyWord(sValue)) {
					resetRound();
				}
				alert.show(
					<div className="alert-bloc">
						{fValidWordSentence}
						{sValidWordSentence}
						{winnerSentence}
					</div>
				);
			}
		} else if (fPlayerOnBlackCase && !sPlayerOnBlackCase && fValid === 1) {
			var fSentence = (
				<p>
					Le mot entré par <span className="important-word">{firstPlayer.name}</span>{" "}
					n'est pas valide, le joueur recule donc de{" "}
					<span className="important-word">{fNbCases}</span> cases.
				</p>
			);
			if (verifyWord(fValue)) {
				fSentence = (
					<p>
						Le mot entré par{" "}
						<span className="important-word">{firstPlayer.name}</span> est valide, le
						joueur confirme donc sa position.
					</p>
				);
			} else {
				setFPlayerCase(fPlayerCase - fNbCases);
			}
			resetRound();
			alert.show(<div className="alert-bloc">{fSentence}</div>);
		} else if (sPlayerOnBlackCase && !fPlayerOnBlackCase && sValid === 2) {
			setTimeout(() => {
				var sSentence = (
					<p>
						Le mot entré par{" "}
						<span className="important-word">{secondPlayer.name}</span> n'est pas
						valide, le joueur recule donc de{" "}
						<span className="important-word">{sNbCases}</span> cases.
					</p>
				);
				if (sValue.length > 0) {
					sSentence = (
						<p>
							Le mot entré par{" "}
							<span className="important-word">{secondPlayer.name}</span> est valide,
							le joueur confirme donc sa position.
						</p>
					);
				} else {
					setSPlayerCase(sPlayerCase - sNbCases);
				}
				resetRound();
				alert.show(<div className="alert-bloc">{sSentence}</div>);
			}, 2000);
		} else if (
			fPlayerOnBlackCase &&
			sPlayerOnBlackCase &&
			fValid === 1 &&
			sValid === 1
		) {
			var fSentence = (
				<p>
					Le mot entré par <span className="important-word">{firstPlayer.name}</span>{" "}
					n'est pas valide, le joueur recule donc de{" "}
					<span className="important-word">{sNbCases}</span> cases.
				</p>
			);
			var sSentence = (
				<p>
					Le mot entré par{" "}
					<span className="important-word">{secondPlayer.name}</span> n'est pas
					valide, le joueur recule donc de{" "}
					<span className="important-word">{sNbCases}</span> cases.
				</p>
			);
			if (verifyWord(fValue)) {
				fSentence = (
					<p>
						Le mot entré par{" "}
						<span className="important-word">{firstPlayer.name}</span> est valide, le
						joueur confirme donc sa position.
					</p>
				);
			} else {
				setFPlayerCase(fPlayerCase - fNbCases);
			}
			if (verifyWord(sValue)) {
				sSentence = (
					<p>
						Le mot entré par{" "}
						<span className="important-word">{secondPlayer.name}</span> est valide, le
						joueur confirme donc sa position.
					</p>
				);
			} else {
				setSPlayerCase(sPlayerCase - sNbCases);
			}
			resetRound();
			alert.show(
				<div className="alert-bloc">
					{fSentence}
					{sSentence}
				</div>
			);
		}
	}, [fValid, sValid]);

	const handleRulesClick = () => {
		setVisibleRules(!visibleRules);
	};

	// Piocher les consonnes et voyelles
	const handleClick = (e) => {
		if (e.target.value === "consonne") {
			const randomConsonant =
				consonants[Math.floor(Math.random() * consonants.length)];
			const index = consonants.lastIndexOf(randomConsonant);
			consonants.splice(index, 1);
			setWord((word) => [...word, randomConsonant]);
		} else if (e.target.value === "voyelle") {
			const randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
			const index = vowels.lastIndexOf(randomVowel);
			vowels.splice(index, 1);
			setWord((word) => [...word, randomVowel]);
		}

		if (word.length === 6) {
			setGameState("word");
		}
	};
	// Inputs changes
	const handleFChange = (e) => {
		// Bloquer la possibilité de supprimer avec la tour retour ou supprimer
		if (e.keyCode === 8 || e.keyCode === 46) {
			e.preventDefault();
		}
		const fullWord = e.target.value.toLowerCase();
		const letter = fullWord[fullWord.length - 1];
		// Vérifier si la lettre entrée est contenu dans la série de lettre piochée
		if (fTempWord.includes(letter)) {
			const index = fTempWord.lastIndexOf(letter);
			fTempWord.splice(index, 1);
			setfValue(fullWord);
		}
	};
	// Submit buttons
	const handleFSubmit = () => {
		setfValid(1);
		setIsFVisible(false);
		setsValid(1);
	};
	// Resets
	const handleFreset = () => {
		setfValue("");
		setfTempWord([]);
		word.forEach((letter) => {
			setfTempWord((fTempWord) => [...fTempWord, letter]);
		});
	};

	// Déplacements
	const [fPos, setFPos] = useState({});
	useEffect(() => {
		movePawn();
	}, [fPlayerCase]);

	const [sPos, setSPos] = useState({});
	useEffect(() => {
		movePawn();
	}, [sPlayerCase]);

	// Lorsque J1 attérit sur une case noire
	useEffect(() => {
		if (blackCaseState) {
			if (fPlayerCase % 2 === 1) {
				setFnbCases(fValue.length);
				setFplayerOnBlackCase(true);
				blackCasePhase(firstPlayer);
			} else {
				resetRound();
			}
		}
	}, [fPlayerCase]);

	// Lorsque J2 attérit sur une case noire
	useEffect(() => {
		if (blackCaseState) {
			if (sPlayerCase % 2 === 1) {
				setSnbCases(sValue.length);
				setSplayerOnBlackCase(true);
				blackCasePhase(secondPlayer, sValue.length);
			} else {
				resetRound();
			}
		}
	}, [sPlayerCase]);

	useEffect(() => {
		if (fTokens === tours) {
			history.push(`/end/${firstPlayer.name}`);
		}
		if (sTokens === tours) {
			history.push(`/end/${secondPlayer.name}`);
		}
	}, [fTokens, sTokens]);

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
						<span className="star" style={fPos}>
							{firstPlayer.getSymbolHref()}
						</span>
						<span className="square-symbol" style={sPos}>
							{secondPlayer.getSymbolHref()}
						</span>
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
								<i className="bx bx-star"></i>
							</span>
							<span>
								<i className="bx bx-square"></i>
							</span>
						</div>
					</div>
					<div className="player-box">
						<div className="top">
							<h3>{firstPlayer.name}</h3>
							<span>{fTokens}/3 JETONS</span>
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
								visibility={isFVisible}
							/>
						)}
					</div>
					<div className="player-box">
						<div className="top">
							<h3>{secondPlayer.name}</h3>
							<span>{sTokens}/3 JETONS</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pve;
