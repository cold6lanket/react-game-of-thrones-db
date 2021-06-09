import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';


class App extends Component {
    state = {
        hide: false,
        selectedChar: null,
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onToggleHide() {
        const elem = this.state.hide;

        this.setState({
            hide: !elem
        });
    }

    onCharacterSelected = (id) => {
        this.setState({
            selectedChar: id
        });
    } 

    render() {
        let elem = <RandomChar />;

        if (this.state.error) return <ErrorMessage/>;

        if (this.state.hide) {
            elem = null;
        }

        return (
            <Container>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {elem}
                            <button
                                onClick={() => this.onToggleHide()} 
                                className='btn btn-secondary'
                            >Toggle random character!</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onCharacterSelected={this.onCharacterSelected} 
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails 
                                charId={this.state.selectedChar} 
                            />
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default App;