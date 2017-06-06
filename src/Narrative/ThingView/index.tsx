import * as React from 'react';
import { observer } from 'mobx-react';
import { ThingKind, description } from './../../Thing';
import { interactions, label, interact } from './../../Interactions';
import Game from './../../Game';

interface Props {
  thing: ThingKind;
  game: Game;
}

interface ButtonProps {
  onClick: (e: React.SyntheticEvent<HTMLElement>) => void;
  label: string;
}

const InteractionButton = observer(({ onClick, label }: ButtonProps): JSX.Element => {
  return (
    <a className="button is-small" href="#" onClick={onClick}>
      {label}
    </a>
  );
});

const ThingView = observer(({ thing, game }: Props): JSX.Element => {
  return (
    <p className="content">
      {description(thing)}<br />

      {interactions(thing).map(i =>
        <InteractionButton label={label(i)} onClick={() => interact(game, i)} />)
      }

    </p>
  );
});

export default ThingView;
