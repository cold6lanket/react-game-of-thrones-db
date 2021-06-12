import React, { Component } from 'react';
import GotService from '../../services/getService.js';
import Field from '../field';
import CharDetails from '../charDetails';

class BooksItem extends Component {
    gotService = new GotService();

    render() {
        return (
            <CharDetails
                getData={this.gotService.getSpecificBook} 
                charId={this.props.bookId}
            >
                <Field field="numberOfPages" label="Number of pages" />
                <Field field="publisher" label="Publisher" />
                <Field field="released" label="Released" />
            </CharDetails>
        );
    }
}

export default BooksItem;