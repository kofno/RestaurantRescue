import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from './../../Game';
import App from './../index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App game={new Game()} />, div);
});
