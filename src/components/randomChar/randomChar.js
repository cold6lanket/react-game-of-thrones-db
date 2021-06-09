import React, {Component} from 'react';
import GotService from '../../services/getService.js';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

import './randomChar.css';

export default class RandomChar extends Component {
    
    state = {
        char: {},
        loading: true,
        error: false
    };

    gotService = new GotService();

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharacterLoaded = (char) => {
        this.setState({ 
            char,
            loading: false,
        });
    }

    onError = () => {
        this.setState({ 
            error: true,
            loading: false
        });
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 140 + 25);

        this.gotService
            .getSpecificCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;

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
