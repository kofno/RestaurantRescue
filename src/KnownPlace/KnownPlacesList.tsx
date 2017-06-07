import * as React from 'react';
import { observer } from 'mobx-react';
import ULAppear from './../ULAppear';
import KnownPlaceLink from './../KnownPlaceLink';
import Game from './../Game';

interface Props {
  game: Game;
}

const KnownPlacesList = ({ game }: Props) => {
  const knownPlaces = game.knownPlaces;
  return (
    <ULAppear>
      {knownPlaces.map(p => <KnownPlaceLink key={p} place={p} game={game} />)}
    </ULAppear>
  );
};

export default observer(KnownPlacesList);
