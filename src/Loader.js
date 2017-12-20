import React, { Component } from 'react';
import './loader.css';

class Loader extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            this.props.show && <div className='loader' show={this.props.show}></div>
        )
    }
}

export default Loader;