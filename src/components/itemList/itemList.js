import React, {Component} from 'react';
import './itemList.css';
import GotService from '../../services/getService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: null,
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true,
            charList: null
        });
    }

    componentDidMount() {
        this.gotService
            .getAllCharacters()
            .then(charList => {
                this.setState({ 
                    charList,
                    error: false 
                });
            })
            .catch(() => this.onError());
    }

    onError() {
        this.setState({ 
            error: true,
            charList: null
        })
    }

    showCharacters(arr) {
        return arr.map((item) => {
            return (
                <li 
                    onClick={() => this.props.onCharacterSelected(item.id)}
                    key={item.id}
                    className="list-group-item"
                >
                    {item.name}
                </li>
            );
        });
    }

    render() {
        const { charList, error } = this.state;

        if (error) return <ErrorMessage/>;

        if (!charList) return <Spinner/>;

        const characters = this.showCharacters(charList);

        return (
            <ul className="item-list list-group">
                {characters}
            </ul>
        );
    }
}