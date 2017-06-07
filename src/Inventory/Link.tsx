import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import { ThingKind, description} from './../Thing';
import { Interaction, interactions, interact } from './../Interactions';

interface InventoryLinkProps {
  thing: ThingKind;
  game: Game;
}

const getInteraction = (thing: ThingKind): Interaction | undefined => {
  if (interactions(thing).length === 0) {
    return;
  }
  return interactions(thing)[0];
};

const Link = ({ thing, game }: InventoryLinkProps): JSX.Element => {
  const i = getInteraction(thing);
  return (
    <li>
      {typeof i === 'undefined'
        ? description(thing)
        : <a href="#" onClick={() => interact(game, i)}>{description(thing)}</a>
      }
    </li>
  );
};

export default observer(Link);
