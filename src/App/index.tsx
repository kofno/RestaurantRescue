import * as React from 'react';
import { observer } from 'mobx-react';
import ConsoleArea from './../ConsoleArea';
import Game from './../Game';
import GameView from './../GameView';
import DevTools from 'mobx-react-devtools';
import './App.css';

interface Props {
  game: Game;
}

@observer
class App extends React.Component<Props, {}> {
  render() {
    const game = this.props.game;
    return (
      <div>
        <GameView game={game} />

        <ConsoleArea game={game} />
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </div>
    );
  }
}

export default App;
