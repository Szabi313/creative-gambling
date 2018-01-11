import React, {Component} from 'react';
import './BubbleCSSTransition.css'
import './winnertitle.css'

class WinnerTitle extends Component{
    constructor(props){
        super(props)
    }

    toggle = () => {
        this.props.toggle()
    }

    render(){
        return(
            this.props.show &&
            <div className="winnerTitle">
                <h3>YOU WON!</h3>
                <img src = {this.props.src} show={this.props.show} className="base"></img>
                <button onClick={this.toggle} className="greatButton"><span>Great! , ok</span></button>
            </div>
        )
    }
}

export default WinnerTitle;