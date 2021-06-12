import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/getService.js';
import {CharacterPage, BooksPage, HousesPage, BooksItem, HomePage} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

class App extends Component {
    gotService = new GotService();

    state = {
        hide: false,
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    onToggleHide = () => {
        const elem = this.state.hide;

        this.setState({
            hide: !elem
        });
    }

    render() {
        let elem = <RandomChar />;

        if (this.state.error) return <ErrorMessage/>;

        if (this.state.hide) {
            elem = null;
        }

        return (
            <Router>
                <div className="app">
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

                            <Route path="/" component={HomePage} exact />
                            <Route path="/characters" component={CharacterPage} />
                            <Route path="/houses" component={HousesPage} />
                            <Route path="/books" component={BooksPage} exact />
                            <Route path="/books/:id" 
                                    render={
                                        ({match}) => {
                                            const { id } = match.params;

                                            return <BooksItem bookId={id} />
                                        }   
                                    } 
                            />
                        </Container>
                    </Container>
                </div>
            </Router>
        );
    }
}

export default App;