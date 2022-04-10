import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Links from '../components/Links';
import Rules from '../components/Rules';

const End = () => {
    var { infos } = useParams();
    const [visibleRules, setVisibleRules] = useState(false);
    useEffect(() => {
		document.body.className = "body-outside";
	}, []);
    const handleRulesClick = () => {
		setVisibleRules(!visibleRules);
	};
    return (
        <div className="end">
            <Links handleRulesClick={handleRulesClick} />
			<Rules visibleRules={visibleRules} handleRulesClick={handleRulesClick} />
            <h1 className="winner-sentence"><span className="winner-name">{infos[0]}</span> a gagné la partie !</h1>
            <Link to="/" className="play">REJOUER</Link>
        </div>
    );
};

export default End;