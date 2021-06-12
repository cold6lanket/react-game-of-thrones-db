import React, {Component} from 'react';
//import GotService from '../../services/getService.js';
import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';

import './charDetails.css';


export default class CharDetails extends Component {
    // _isMounted = false;

    state = {
        character: null,
        loading: true
    }

    componentDidMount() {
        //this._isMounted = true;
        this.updateChar();
    }

    // componentWillUnmount() {
    //     this._isMounted = false;
    // }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const { charId, getData } = this.props;

        if (!charId) return;

        getData(charId)
            .then(character => {
                this.setState({
                    character,
                    loading: false
                });
                // if (this._isMounted) {
                //     this.setState({character});
                // }
            });
    }


    render() {
        const errMessage = <span className="select-error">Please select character</span>;
        const { character, loading } = this.state;

        if (!character) return errMessage;
        if (loading) return <Spinner/>;

        const { name } = character;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, { character });
                        })
                    }
                </ul>
            </div>
        );
    }
}