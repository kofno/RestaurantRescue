import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';

interface Props {
  game: Game;
  title?: string;
}

const GameTitle = observer(({ game, title }: Props): JSX.Element => {
  const text = title || 'Restaurant Rescue';
  return <p className="title is-3">{text}</p>;
});

export default GameTitle;
