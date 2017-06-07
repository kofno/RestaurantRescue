import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';

interface Props {
  game: Game;
  title?: string;
}

const GameTitle = ({ game, title }: Props): JSX.Element => {
  const text = title || 'Restaurant Rescue';
  return <div className="title is-3">{text}</div>;
};

export default observer(GameTitle);
