import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Links from "../components/Links";
import Rules from "../components/Rules";

class Player {
    constructor(name) {
        this.name = name;
    }
}
// :Joueur1&Joueur2 -> ['Joueur1', 'Joueur2']
const nameSplitter = (names) => {
    names = names.substr(1);
    names = names.split("&");
    return names;
}

const Play = () => {
    const [visibleRules, setVisibleRules] = useState(false);
    var { names } = useParams();
    names = nameSplitter(names);
    // Joueurs
    var firstPlayer = new Player(names[0]);
    var secondPlayer = new Player(names[1]);

    //Image du body
    useEffect(() => {
        document.body.className = "body-outside";
    });

    const handleRulesClick = () => {
      setVisibleRules(!visibleRules)
    }

    return (
        <div className="play-page">
            <Links handleRulesClick={handleRulesClick} />
            <Rules visibleRules={visibleRules} handleRulesClick={handleRulesClick} />
            <div className="play-container">
                <span>{firstPlayer.name}</span>
                <span>VS</span>
                <span>{secondPlayer.name}</span>
            </div>
        </div>
    )
}

export default Play;