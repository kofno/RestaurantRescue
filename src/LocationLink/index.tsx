import * as React from 'react';
import { observer } from 'mobx-react';
import { Exit, name, places } from './../Place';
import Game from './../Game';

interface Props {
  exit: Exit;
  game: Game;
}

const handleClick = (game: Game, exit: Exit) => (): void =>
  game.exitTo(exit);

const LocationLink = observer(({ exit, game }: Props) => {
  return (
    <p className="content" key={exit.kind}>
      <a href="#" onClick={handleClick(game, exit)}>
        {name(exit, places)}
      </a>
    </p>
  );
});

export default LocationLink;
