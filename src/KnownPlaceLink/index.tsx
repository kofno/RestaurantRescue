import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import Place from './../Place';

interface KnownPlaceProps {
  place: Place;
  game: Game;
}

const handlePlaceClick = (place: Place, game: Game) => () =>
  game.moveTo(place);

const KnownPlaceLink = observer(({ place, game }: KnownPlaceProps) => {
  return (
    <li key={place.kind}>
      <a href="#" onClick={handlePlaceClick(place, game)}>
        {place.name}
      </a>
    </li>
  );
});

export default KnownPlaceLink;
