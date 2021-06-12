import React, {Component} from 'react';
import Field from '../field';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/getService.js';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {

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
                getData={this.gotService.getHouses} 
                onItemSelected={this.onItemSelected}
                renderItem={({name}) => name} 
            />
        );

        const charDetails = (
            <CharDetails
                getData={this.gotService.getSpecificHouse} 
                charId={this.state.selectedChar}
            >
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='ancestralWeapons' label='Ancestral Weapons'/>
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