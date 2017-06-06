import * as React from 'react';
import { observer } from 'mobx-react';
import AreaTitle from './../AreaTitle';
import { ThingKind, description } from './../Thing';
import { Interaction, interactions, interact } from './../Interactions';
import Game from './../Game';
import ULAppear from './../ULAppear';

interface Props {
  game: Game;
}

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

const InventoryLink = observer(({ thing, game }: InventoryLinkProps): JSX.Element => {
  const i = getInteraction(thing);
  return (
    <li>
      {typeof i === 'undefined'
        ? description(thing)
        : <a href="#" onClick={() => interact(game, i)}>{description(thing)}</a>
      }
    </li>
  );
});

const Inventory = observer(({ game }: Props): JSX.Element => {
  const inventory = game.things.filter(t => t.place === 'inventory');
  return (
    <div>
      <AreaTitle text="Inventory" />
      <ULAppear>
        {inventory.map(i => <InventoryLink key={i.thing} thing={i.thing} game={game} />)}
      </ULAppear>
    </div>
  );
});

export default Inventory;
