import * as React from 'react';
import { observer } from 'mobx-react';
import Exit from './../Exit';
import Game from './../Game';

interface Props {
  exit: Exit;
  game: Game;
}

const handleClick = (game: Game, exit: Exit) => (): void =>
  game.moveTo(exit.place);

const LocationLink = observer(({ exit, game }: Props) => {
  return (
    <p className="content" key={exit.place.kind}>
      <a href="#" onClick={handleClick(game, exit)}>
        {exit.place.name}
      </a>
    </p>
  );
});

export default LocationLink;
