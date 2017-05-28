import * as React from 'react';
import { observer } from 'mobx-react';
import DesktopLayout from './../DesktopLayout';
import Narrative from './../Narrative';
import KnownPlaces from './../KnownPlace';
import Inventory from './../Inventory';
import Game from './../Game';
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
        <DesktopLayout
          narrative={<Narrative game={game} />}
          places={(<KnownPlaces game={game} />)}
          inventory={<Inventory />}
        />
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </div>
    );
  }
}

export default App;
