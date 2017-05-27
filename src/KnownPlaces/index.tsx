import * as React from 'react';
import { Place, LocationChangeFn } from './../Places';

interface Props {
  knownPlaces: Place[];
  onLocationChange: LocationChangeFn;
}

const listPlaces = (places: Place[], cb: LocationChangeFn): JSX.Element[] =>
  places.map(place => (
    <li key={place.kind}>
      <a href="#" onClick={() => cb(place.kind)}>
        {place.name}
      </a>
    </li>
  ));

const KnownPlaces = ({ knownPlaces, onLocationChange }: Props) => {
  return (
    <div>
      <p className="title is-5">Known Places</p>

      <ul>
        {listPlaces(knownPlaces, onLocationChange)}
      </ul>
    </div>
  );
};

export default KnownPlaces;
