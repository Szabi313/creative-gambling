import React, { Component } from 'react';
import './App.css';
import Bubbles from './Bubbles'
import BubbleCSSTransition from './BubbleCSSTransition';

class App extends Component {

    constructor(props){
        super(props);
    }



  render() {
    return (
      <div className="App">
        <div className="title"><span>Creative Gambling</span></div>
        <Bubbles/>
      </div>
    );
  }
}

export default App;
