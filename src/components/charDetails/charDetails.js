import React, { useState, useEffect } from 'react';
//import GotService from '../../services/getService.js';
//import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';
import './charDetails.css';


export default function CharDetails({ charId, getData, itemName, children }) {
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        updateChar();

    }, [charId]);
 

    function updateChar() {
        if (!charId) return;

        getData(charId)
            .then(character => setCharacter(character));
    }



    const errMessage = <span className="select-error">Please select {itemName}</span>;
    

    if (!character) {
        return (
            <div className="char-details rounded error">
                {errMessage}
            </div>
        );
    }

    const { name } = character;


    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, { character });
                    })
                }
            </ul>
        </div>
    );

}