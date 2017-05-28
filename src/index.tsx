import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import App from './App';
import Game from './Game';
import 'bulma/css/bulma.css';
import './index.css';

useStrict(true);

const gameState = new Game();

ReactDOM.render(
  <App game={gameState} />,
  document.getElementById('root') as HTMLElement
);
