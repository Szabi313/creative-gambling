import React, {Component} from 'react';
import './instructions.css';

class Instructions extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="instructionsContainer">
                <p>Choose {this.props.gameConfig.symbolsToBeChoosen} bubbles</p>
                <p>If {this.props.gameConfig.symbolsNumToWin} are the same, then you win!</p>
            </div>
        )
    }
}

export default Instructions;