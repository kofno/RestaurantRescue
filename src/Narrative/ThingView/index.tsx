import * as React from 'react';
import { observer } from 'mobx-react';
import { Thing } from './../../Thing';
import Game from './../../Game';

interface Props {
  thing: Thing;
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
      {thing.description}<br />

      {thing.interactions.map(i =>
        <InteractionButton label={i.label} onClick={() => game.interact(i)} />)
      }

    </p>
  );
});

export default ThingView;
