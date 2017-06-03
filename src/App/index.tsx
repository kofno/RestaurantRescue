import * as React from 'react';
import { observer } from 'mobx-react';
import DesktopLayout from './../DesktopLayout';
import Narrative from './../Narrative';
import KnownPlaces from './../KnownPlace';
import Inventory from './../Inventory';
import ConsoleArea from './../ConsoleArea';
import Game from './../Game';
import Start from './../Start';
import End from './../End';
import DevTools from 'mobx-react-devtools';
import './App.css';

interface Props {
  game: Game;
}

const GameView = observer(({ game }: Props): JSX.Element => {
  switch (game.gameStatus.kind) {
    case 'loading':
      return <div>Loading...</div>;

    case 'start':
      return <Start game={game} />;

    case 'end':
      return <End game={game} />;

    case 'play':
      const place = game.gameStatus.place;
      return (
        <DesktopLayout
          narrative={<Narrative game={game} place={place} />}
          places={<KnownPlaces game={game} />}
          inventory={<Inventory game={game} />}
        />
      );
  }
});

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
