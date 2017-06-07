import * as React from 'react';
import { observer } from 'mobx-react';
import DesktopLayout from './../DesktopLayout';
import Narrative from './../Narrative';
import KnownPlaces from './../KnownPlace';
import Inventory from './../Inventory';
import Start from './../Start';
import End from './../End';
import Game from './../Game';

interface Props {
  game: Game;
}

const GameView = ({ game }: Props): JSX.Element => {
  switch (game.gameStatus) {
    case 'start':
      return <Start game={game} />;

    case 'end':
      return <End game={game} />;

    case 'play':
      return (
        <DesktopLayout
          narrative={<Narrative game={game} />}
          places={<KnownPlaces game={game} />}
          inventory={<Inventory game={game} />}
        />
      );
  }
};

export default observer(GameView);
