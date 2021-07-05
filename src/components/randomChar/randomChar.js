import React, { useState, useEffect } from 'react';
import GotService from '../../services/getService.js';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

import './randomChar.css';

export default function RandomChar() {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    

    const gotService = new GotService();

    useEffect(() => {
        updateCharacter();
        const timerId = setInterval(updateCharacter, 15000);

        return () => clearInterval(timerId);
    }, []);


    const onCharacterLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const updateCharacter = () => {
        const id = Math.floor(Math.random() * 140 + 25);

        gotService
            .getSpecificCharacter(id)
            .then(onCharacterLoaded)
            .catch(onError);
    }



    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char} /> : null;


    return (
        <>
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        </>
    );

}

const View = ({ char }) => {
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    );
};
