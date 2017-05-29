import * as React from 'react';
import { observer } from 'mobx-react';
import { Thing } from './../../Thing';
import Game from './../../Game';

interface Props {
  thing: Thing;
  game: Game;
}

const ThingView = observer(({ thing, game }: Props): JSX.Element => {
  return (
    <p className="content">
      {thing.description}<br />

      <a className="button is-small" href="#">Interact</a>
    </p>
  );
});

export default ThingView;
