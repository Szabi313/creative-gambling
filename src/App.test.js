import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Bubbles from './Bubbles';



it('renders without crashing', () => {
  const div = document.createElement('div');

  let app = ReactDOM.render(<App />, div);
});
