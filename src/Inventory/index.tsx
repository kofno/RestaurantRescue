import * as React from 'react';
import { observer } from 'mobx-react';
import AreaTitle from './../AreaTitle';
import Link from './Link';
import Game from './../Game';
import ULAppear from './../ULAppear';

interface Props {
  game: Game;
}

const Inventory = ({ game }: Props): JSX.Element => {
  const inventory = game.things.filter(t => t.place === 'inventory');
  return (
    <div>
      <AreaTitle text="Inventory" />
      <ULAppear>
        {inventory.map(i => <Link key={i.thing} thing={i.thing} game={game} />)}
      </ULAppear>
    </div>
  );
};

export default observer(Inventory);
