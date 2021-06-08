import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


class App extends Component {
    state = {
        hide: false
    };

    onToggleHide() {
        const elem = this.state.hide;

        this.setState({
            hide: !elem
        });
    }

    render() {
        let elem = <RandomChar />;

        if (this.state.hide) {
            elem = null;
        }

        return (
            <> 
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
                            >Toggle here!</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default App;