import React, {Component} from 'react'

class NewGame extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            this.props.show && <button show={this.props.show} onClick={this.props.onClick} className="newGameButton">
                New game
            </button>
        )
    }
}

export default NewGame;