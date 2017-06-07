import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import KnownPlacesList from './KnownPlacesList';
import AreaTitle from './../AreaTitle';

interface Props {
  game: Game;
}

const KnownPlaces = ({ game }: Props) => {
  return (
    <div>
      <AreaTitle text="Known Places" />
      <KnownPlacesList game={game} />
    </div>
  );
};

export default observer(KnownPlaces);
