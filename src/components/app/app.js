import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';


class App extends Component {
    state = {
        hide: false,
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
                    <CharacterPage/>
                </Container>
            </Container>
        );
    }
}

export default App;