import React, {Component} from 'react';
import './itemList.css';
import GotService from '../../services/getService';
import Spinner from '../spinner';

export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: null
    };

    componentDidMount() {
        this.gotService
            .getAllCharacters()
            .then(charList => {
                this.setState({ charList });
            });
    }

    showCharacters(arr) {
        return arr.map((item, i) => {
            return (
                <li 
                    onClick={() => this.props.onCharacterSelected(41 + i)}
                    key={item.name + i}
                    className="list-group-item"
                >
                    {item.name}
                </li>
            );
        });
    }

    render() {
        const { charList } = this.state;

        if (!charList) return <Spinner/>;

        const characters = this.showCharacters(charList);

        return (
            <ul className="item-list list-group">
                {characters}
            </ul>
        );
    }
}