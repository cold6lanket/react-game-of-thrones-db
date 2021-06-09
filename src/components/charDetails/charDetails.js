import React, {Component} from 'react';
import GotService from '../../services/getService.js';
import './charDetails.css';


export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        character: null
    };

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
                this.setState({ character });
            });
    }


    render() {
        const errMessage = <span className="select-error">Please select character</span>;

        if (!this.state.character) return errMessage;

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