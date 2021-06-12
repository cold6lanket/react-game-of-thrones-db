import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';

export default class ItemList extends Component {
    
    state = {
        itemList: null,
    };


    // when component is rendered
    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then(itemList => {
                this.setState({ 
                    itemList
                });
            });
    }

  

    showCharacters(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = this.props.renderItem(item);

            return (
                <li 
                    onClick={() => this.props.onItemSelected(id)}
                    key={id}
                    className="list-group-item"
                >
                    {label}
                </li>
            );
        });
    }

    render() {
        const { itemList } = this.state;

        if (!itemList) return <Spinner/>;

        const characters = this.showCharacters(itemList);

        return (
            <ul className="item-list list-group">
                {characters}
            </ul>
        );
    }
}