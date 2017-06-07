import * as React from 'react';
import { observer } from 'mobx-react';
import { ThingKind, description } from './../../Thing';
import { interactions, label, interact } from './../../Interactions';
import Game from './../../Game';
import InteractionButton from './../InteractionButton';

interface Props {
  thing: ThingKind;
  game: Game;
}

const ThingView = ({ thing, game }: Props): JSX.Element => {
  return (
    <p className="content">
      {description(thing)}<br />

      {interactions(thing).map(i => (
        <InteractionButton
          key={i.kind}
          label={label(i)}
          onClick={() => interact(game, i)}
        />))
      }

    </p>
  );
};

export default observer(ThingView);
