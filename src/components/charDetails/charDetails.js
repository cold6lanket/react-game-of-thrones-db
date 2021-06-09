import React, {Component} from 'react';
import GotService from '../../services/getService.js';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './charDetails.css';


export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        character: null,
        loading: true,
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;

        if (!charId) return;

        this.gotService
            .getSpecificCharacter(charId)
            .then(character => {
                this.setState({ 
                    character,
                    loading: false 
                });
            })
            .catch(() => {
                this.setState({ 
                    character: null,
                    error: true 
                });
            });
    }


    render() {
        const errMessage = <span className="select-error">Please select character</span>;
        const {error, character, loading} = this.state;

        if (error) return <ErrorMessage/>;

        if (!character) return errMessage;

        if (loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            );
        }

        const {name, born, died, culture, gender} = this.state.character;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}