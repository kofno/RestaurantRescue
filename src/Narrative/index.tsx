import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import GameTitle from './../GameTitle';
import NarrativeBody from './NarrativeBody';

interface Props {
  game: Game;
}

const Narrative = ({ game }: Props) => {
  return (
    <div>
      <GameTitle game={game} />
      <NarrativeBody game={game} />
    </div>
  );
};

export default observer(Narrative);
