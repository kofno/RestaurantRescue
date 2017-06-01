import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';

interface Props {
  game: Game;
}

const GameTitle = observer(({ game }: Props): JSX.Element => {
  return <p className="title is-3">Resturaunt Rescue</p>;
});

export default GameTitle;
