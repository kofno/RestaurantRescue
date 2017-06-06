import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import { PlaceType, name } from './../Place';

interface KnownPlaceProps {
  place: PlaceType;
  game: Game;
}

const KnownPlaceLink = observer(({ place, game }: KnownPlaceProps) => {
  return (
    <li key={place}>
      <a href="#" onClick={() => game.moveTo(place)}>
        {name(place)}
      </a>
    </li>
  );
});

export default KnownPlaceLink;
