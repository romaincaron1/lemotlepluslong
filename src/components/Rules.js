import React from "react";
import Links from "./Links";

const Rules = ({ visibleRules, handleRulesClick }) => {
	let className = "rules";

	if (visibleRules) {
		className = className + " on";
	} else {
		className = className + " off";
	}

	return (
		<div className={className}>
			<Links handleRulesClick={handleRulesClick} />
			<div className="container">
				<h1>RÈGLES</h1>
				<div className="bar"></div>
				<div className="text">
					<h2>But du jeu :</h2>
					<p>
						Il s’agit pour les joueurs de progresser le plus rapidement possible sur
						les 18 cases du parcours. Le vainqueur est le premier qui a effectué 3
						tours complets.
					</p>
					<h2>Règles du jeu :</h2>
					<p>
						Le joueur qui ouvre la partie, après tirage au sort, choisira 7 cartes en
						tout dans les deux paquets de consonnes et de voyelles qui ont été placés
						séparément, face cachée dans le sabot. Il tire une première carte, et
						avant de tirer la carte suivante, il peut regarder celle qu’il vient de
						prendre et décider ainsi, en connaissance de cause, de son nouveau choix
						(consonnes ou voyelles). Ces 7 cartes sont placées devant lui de façon
						qu’elles puissent être vues de tous.
					</p>
					<p>
						Le sablier se retourne et les joueurs examinent le jeu. Ils disposent
						alors de 1 minute et 30 secondes pour chercher le mot le plus long qu’ils
						peuvent composer à l’aide de ces 7 lettres. Dès que le temps est écoulé,
						les joueurs doivent annoncer leur mot et le réaliser sur la table en
						disposant convenablement les unes à côté des autres, les lettres qu’ils
						utilisent. Le joueur qui a composé le plus long mot remporte la manche et
						peut donc avancer sur le plateau.
					</p>
					<p>
						L’avancé de chacun des joueurs sur le parcours est déterminé par le nombre
						de lettres qu’il a pu utiliser pour composer un mot. Si le joueur atterrit
						sur une noire, alors il doit lancer le dé. Le chiffre qui ressort
						correspond à une voyelle des cartes noires (1 vaut A, 2 vaut E, etc…).
						Après cela, le joueur doit retirer une lettre de son choix du mot qu’il
						vient de composer, et composer un nouveau mot comportant autant de lettre
						que le premier avec la nouvelle lettre. S’il n’y parvient pas, il retourne
						à sa place d’origine sur le plateau et la parole passe à l’autre joueur.
						La carte noire est remise à sa place à côté des cinq autres cartes noires.
						Si le joueur atterrit sur une case blanche, alors il peut y rester sans
						condition supplémentaire à valider.
					</p>
					<h2>Cas particuliers et remarques :</h2>
					<p>
						Si aucun des joueurs ne trouve de mot avec les 7 lettres disponibles, le
						joueur dont c’était le tour conserve son tour, et personne ne marque de
						points. Il faut alors replacer 7 nouvelles lettres. Lorsque les 2 joueurs
						proposent un mot de même longueur, les 2 joueurs avancent sur le plateau.
					</p>
					<p>
						Lors de l’arrivée sur une case noire : Si par chance, le joueur a sorti la
						même lettre que celle qu'il a retirée, il peut refaire le même mot. Si les
						2 joueurs arrivent sur une case noire en même temps, le joueur venant de piocher
            garde la main et repioche une lettre.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Rules;
