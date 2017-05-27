import * as React from 'react';
import DesktopLayout from './../DesktopLayout';
import Narrative from './../Narrative';
import KnownPlaces from './../KnownPlaces';
import Inventory from './../Inventory';
import { Place, places, lookupPlace } from './../Places';
import './App.css';

interface State {
  locations: Place[];
  knownPlaces: Place[];
  place: Place;
}

const handleLocationChange = (app: App) => (kind: string): void => {
  const updateLocation = (prevState: State, props: {}) => {
    const place = lookupPlace(kind, prevState.locations).getOrElse(prevState.place);
    const knownPlaces = lookupPlace(kind, prevState.knownPlaces).cata({
      Nothing: () => prevState.knownPlaces.concat([place]),
      Just: (_) => prevState.knownPlaces
    });
    return {
      knownPlaces,
      place
    };
  };
  app.setState(updateLocation);
};

class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    const kitchen = places[0];
    this.state = {
      locations: places,
      knownPlaces: [kitchen],
      place: kitchen,
    };
  }

  render() {
    return (
      <DesktopLayout
        narrative={(
          <Narrative
            place={this.state.place}
            onLocationChange={handleLocationChange(this)}
          />
        )}
        places={(
          <KnownPlaces
            knownPlaces={this.state.knownPlaces}
            onLocationChange={handleLocationChange(this)}
          />
        )}
        inventory={<Inventory />}
      />
    );
  }
}

export default App;
