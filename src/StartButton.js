import React, {Component} from 'react';
import './StartButton.css'

class StartButton extends Component{
    constructor(props){
        super(props);

        this.state = {
            //show: true
        }
    }





    handleClickStart = () => {
        //this.setState({show: false})
        this.props.onClick();
    }

    render(){
        return(
             this.props.show && <button onClick={this.handleClickStart} className='startButton' show={this.props.show}>Start</button>
        )
    }
}

export default StartButton;