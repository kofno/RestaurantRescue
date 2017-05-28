import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import KnownPlaceLink from './../KnownPlaceLink';
import AreaTitle from './../AreaTitle';
import ULAppear from './../ULAppear';

interface Props {
  game: Game;
}

const KnownPlacesList = observer(({ game }: Props) => {
  const knownPlaces = game.knownPlaces;
  return (
    <ULAppear>
      {knownPlaces.map(p => <KnownPlaceLink place={p} game={game} />)}
    </ULAppear>
  );
});

const KnownPlaces = observer(({ game }: Props) => {
  return (
    <div>
      <AreaTitle text="Known Places" />
      <KnownPlacesList game={game} />
    </div>
  );
});

export default KnownPlaces;
