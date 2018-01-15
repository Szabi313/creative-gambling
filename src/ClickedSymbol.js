import React, {Component} from 'react';
import './clicked.css'

class ClickedSymbol extends Component{
    constructor(props){
        super(props);

        this.state = {
            show: false
        }
    }

    render(){
        return(

            <div className="clickedImgContainer">
                <div className="clickedImgSrc" ><img src={this.props.clickedImg}/></div>
                <div className="clickedImgNum" ><span>{this.props.clickNum}</span></div>
            </div>
        )
    }
}

export default ClickedSymbol;