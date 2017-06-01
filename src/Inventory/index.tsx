import * as React from 'react';
import { observer } from 'mobx-react';
import AreaTitle from './../AreaTitle';
import { Thing } from './../Thing';
import { Interaction } from './../Interaction';
import Game from './../Game';
import ULAppear from './../ULAppear';

interface Props {
  game: Game;
}

interface InventoryLinkProps {
  thing: Thing;
  game: Game;
}

const getInteraction = (thing: Thing): Interaction | undefined => {
  if (thing.interactions.length === 0) {
    return;
  }
  return thing.interactions[0];
};

const InventoryLink = observer(({ thing, game }: InventoryLinkProps): JSX.Element => {
  const i = getInteraction(thing);
  return (
    <li>
      {typeof i === 'undefined'
        ? thing.description
        : <a href="#" onClick={() => game.interact(i)}>{thing.description}</a>
      }
    </li>
  );
});

const Inventory = observer(({ game }: Props): JSX.Element => {
  const inventory = game.inventory;
  return (
    <div>
      <AreaTitle text="Inventory" />
      <ULAppear>
        {inventory.map(i => <InventoryLink thing={i} game={game} />)}
      </ULAppear>
    </div>
  );
});

export default Inventory;
