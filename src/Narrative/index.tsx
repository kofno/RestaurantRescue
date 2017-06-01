import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import GameTitle from './../GameTitle';
import LocationLink from './../LocationLink';
import AreaTitle from './../AreaTitle';
import FadeIn from './../FadeIn';
import ThingView from './ThingView';
import Place from './../Place';

interface Props {
  game: Game;
}

interface OtherProps extends Props {
  place: Place;
}

const NarrativeBody = observer(({ place, game }: OtherProps) => {
  return (
    <FadeIn>
      <div key={place.kind}>
        <AreaTitle text={place.name} />
        <p className="content">{place.description}</p>

        {place.things.map(t => <ThingView thing={t} game={game} />)}

        <p className="content">
          {place.exits.map(e => e.description).join(' ')}
        </p>
        <ul>
          {place.exits.map(exit => (<li><LocationLink exit={exit} game={game} /></li>))}
        </ul>
      </div>
    </FadeIn>
  );
});

const Narrative = observer(({ game }: Props) => {
  return (
    <div>
      <GameTitle game={game} />
      {game.place && <NarrativeBody place={game.place} game={game} />}
    </div>
  );
});

export default Narrative;
