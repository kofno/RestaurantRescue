import * as React from 'react';
import { observer } from 'mobx-react';
import { Exit, name } from './../Place';
import Game from './../Game';

interface Props {
  exit: Exit;
  game: Game;
}

const handleClick = (game: Game, exit: Exit) => (): void =>
  game.moveTo(exit.place);

const LocationLink = ({ exit, game }: Props) => {
  return (
    <p className="content">
      <a href="#" onClick={handleClick(game, exit)}>
        {name(exit.place)}
      </a>
    </p>
  );
};

export default observer(LocationLink);
