import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Bubbles from './Bubbles';
import StartButton from './StartButton';
import BubbleCSSTransition from './BubbleCSSTransition';
import Loader from './Loader';
import WinnerTitle from './WinnerTitle';
import ClickedSymbol from './ClickedSymbol';
import Board from './Board';
import Instructions from './Instructions';
import FBLogin from './FBLogin';



it('renders without crashing', () => {
  const div = document.createElement('div');

  let app = ReactDOM.render(<App />, div);
});
