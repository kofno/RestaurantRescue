import * as React from 'react';
import { observer } from 'mobx-react';
import LocationLink from './../LocationLink';
import AreaTitle from './../AreaTitle';
import FadeIn from './../FadeIn';
import ThingView from './ThingView';
import * as ReactMarkdown from 'react-markdown';
import { ThingLocation } from './../Thing';
import { name, description, exits } from './../Place';
import Game from './../Game';
import * as R from 'ramda';

interface Props {
  game: Game;
}

const NarrativeBody = ({ game }: Props): JSX.Element => {
  const place = game.place;
  const thingsHere = R.filter((tl: ThingLocation) => place === tl.place);
  const renderThing = (t: ThingLocation) =>
    <ThingView key={t.thing} thing={t.thing} game={game} />;

  if (!place) { return <span />; }
  return (
    <FadeIn>
      <div key={place}>
        <AreaTitle text={name(place)} />

        <ReactMarkdown
          className="content"
          source={description(place)}
          containerTagName="p"
        />

        {thingsHere(game.things).map(renderThing)}

        <p className="content">
          {exits(place).map(e => e.description).join(' ')}
        </p>
        <ul>
          {exits(place).map(e => (
            <li key={e.place}>
              <LocationLink exit={e} game={game} />
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
};

export default observer(NarrativeBody);
