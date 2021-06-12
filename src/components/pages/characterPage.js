import React, {Component} from 'react';
import Field from '../field';
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

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    } 

    render() {

        if (this.state.error) return <ErrorMessage/>;

        const itemList = (
            <ItemList
                getData={this.gotService.getAllCharacters} 
                onItemSelected={this.onItemSelected}
                renderItem={({name, gender}) => `${name} (${gender})`} 
            />
        );

        const charDetails = (
            <CharDetails
                getData={this.gotService.getSpecificCharacter} 
                charId={this.state.selectedChar}
            >
                <Field field="gender" label="Gender" />
                <Field field="born" label="Born" />
                <Field field="died" label="Died" />
                <Field field="culture" label="Culture" />
            </CharDetails>
        );

        return(
            <RowBlock 
                left={itemList}
                right={charDetails}
            />
        );
    }
}