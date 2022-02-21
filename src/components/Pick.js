import React from 'react';

const Pick = ({ handleClick }) => {
    return (
        <div className="pick">
            <button className="button" value="consonne" onClick={handleClick} >PIOCHER UNE CONSONNE</button>
            <button className="button" value="voyelle" onClick={handleClick} >PIOCHER UNE VOYELLE</button>
        </div>
    );
};

export default Pick;