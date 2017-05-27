import * as React from 'react';
import { Place, LocationRef, LocationChangeFn } from './../Places';

interface Props {
  place: Place;
  onLocationChange: LocationChangeFn;
}

const toOtherLocations = (refs: LocationRef[], cb: LocationChangeFn): JSX.Element[] =>
  refs.map(ref => (
    <p className="content" key={ref.id}>
      <a href="#" onClick={() => cb(ref.id)}>
        {ref.summary}
      </a>
    </p>
  ));

const Narrative = ({ place, onLocationChange }: Props) => {
  return (
    <div>
      <p className="title is-3">Treasure Island</p>

      <p className="title is-5">{place.name}</p>
      <p className="content">{place.description}</p>

      {toOtherLocations(place.refs, onLocationChange)}
    </div>
  );
};

export default Narrative;
