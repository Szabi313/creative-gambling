import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WinnerNumbersComponent extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let winnerNumberList = this.props.winnerNumbers.map(
            (winnerNumber, index) => <li key={index} id={index}>{winnerNumber}</li>
        )

        return(
            <ul>
                {winnerNumberList}
            </ul>
        )
    }
}

export default WinnerNumbersComponent;