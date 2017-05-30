import * as React from 'react';
import { observer } from 'mobx-react';
import AreaTitle from './../AreaTitle';
import { Thing } from './../Thing';
import Game from './../Game';
import { Interaction } from './../Interaction';
import ULAppear from './../ULAppear';

export const inventoryPlaceId = '--inventory--';

const isInventory = (t: Thing): boolean =>
  t.placeId === inventoryPlaceId;

const handleInventoryClick = (game: Game, interaction: Interaction) =>
  (e: React.SyntheticEvent<HTMLElement>): void => {
    e.preventDefault();
    game.interact(interaction);
  };

interface Props {
  game: Game;
}

interface InventoryLinkProps {
  thing: Thing;
  game: Game;
}

const InventoryLink = observer(({ thing, game }: InventoryLinkProps): JSX.Element => {
  const interaction = game.interactions.find(i => i.thingId === thing.kind);
  return (
    <li>
      {interaction && (
        <a href="#" onClick={handleInventoryClick(game, interaction)}>
          {thing.description}
        </a>
      )}
    </li>
  );
});

const Inventory = observer(({ game }: Props): JSX.Element => {
  const inventory = game.things.filter(isInventory);
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
