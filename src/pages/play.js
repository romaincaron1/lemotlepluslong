import React from "react";
import { Link, useParams } from "react-router-dom";
import { nameSplitter } from "../functions/playFunctions";
import Pvp from "./pvp";
import Pve from "./pve";

const Play = () => {
	var { gamemode, names } = useParams();
	names = nameSplitter(names);
	if (gamemode === "pve") {
		names[1] = "IA";
	}

	return (
		<>
			{gamemode === "pvp" ? <Pvp names={names}/> : <Pve names={names} />}
		</>
	);
}

export default Play;
