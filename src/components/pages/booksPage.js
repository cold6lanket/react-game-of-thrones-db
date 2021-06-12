import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/getService.js';
import { withRouter } from 'react-router-dom';


class BooksPage extends Component {

    gotService = new GotService();

    state = {
        error: false,
        selectedBook: null
    };

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }


    render() {

        if (this.state.error) return <ErrorMessage/>;

        return(
            <ItemList
                getData={this.gotService.getBooks} 
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId);
                }}
                renderItem={({name}) => name} 
            />
        );
    }
}

export default withRouter(BooksPage); 