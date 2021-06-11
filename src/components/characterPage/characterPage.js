import React, {Component} from 'react';

import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/getService.js';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: null,
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onCharacterSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    } 

    render() {

        if (this.state.error) return <ErrorMessage/>;

        const itemList = (
            <ItemList
                getData={this.gotService.getAllCharacters} 
                onCharacterSelected={this.onCharacterSelected}
                renderItem={({name, gender}) => `${name} (${gender})`} 
            />
        );

        const charDetails = (
            <CharDetails charId={this.state.selectedChar} />
        );

        return(
            <RowBlock 
                left={itemList}
                right={charDetails}
            />
        );
    }
}