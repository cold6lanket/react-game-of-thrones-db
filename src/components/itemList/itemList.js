import React, {Component} from 'react';
import './itemList.css';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

export default class ItemList extends Component {
    
    state = {
        itemList: null,
        error: false
    };

    // when there is error
    componentDidCatch() {
        this.setState({
            error: true,
            itemList: null
        });
    }

    // when component is rendered
    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then(itemList => {
                this.setState({ 
                    itemList,
                    error: false 
                });
            })
            .catch(() => this.onError());
    }

    // function in case of error from server
    onError() {
        this.setState({ 
            error: true,
            itemList: null
        })
    }

    showCharacters(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = this.props.renderItem(item);

            return (
                <li 
                    onClick={() => this.props.onCharacterSelected(id)}
                    key={id}
                    className="list-group-item"
                >
                    {label}
                </li>
            );
        });
    }

    render() {
        const { itemList, error } = this.state;

        if (error) return <ErrorMessage/>;

        if (!itemList) return <Spinner/>;

        const characters = this.showCharacters(itemList);

        return (
            <ul className="item-list list-group">
                {characters}
            </ul>
        );
    }
}