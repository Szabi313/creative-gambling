import React, {Component} from 'react'

class Board extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let clickedList = this.props.usedImages.map(item => {
            <img src={this.props.imageArray[item]}
        })
    }
}

export default Board;