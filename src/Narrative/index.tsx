import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import LocationLink from './../LocationLink';
import AreaTitle from './../AreaTitle';
import FadeIn from './../FadeIn';
import * as Thing from './../Thing';
import ThingView from './ThingView';

interface Props {
  game: Game;
}

const NarrativeBody = observer(({ game }: Props) => {
  const place = game.place;
  return (
    <FadeIn>
      <div key={place.kind}>
        <AreaTitle text={place.name} />
        <p className="content">{place.description}</p>

        {game.things.filter(Thing.locatedIn(place.kind))
          .map(t => <ThingView thing={t} game={game} />)
        }

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
      <p className="title is-3">Treasure Island</p>

      <NarrativeBody game={game} />
    </div>
  );
});

export default Narrative;
