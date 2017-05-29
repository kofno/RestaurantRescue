import { observable, action } from 'mobx';
import { Exit, places, lookupPlace } from './../Place';
import { Place } from './../Place';
import * as Thing from './../Thing';

class Game {

  @observable place: Place = places[0];

  @observable knownPlaces: Place[] = [places[0]];

  @observable things: Thing.Thing[] = Thing.initialThings;

  @action exitTo(exit: Exit) {
    const newPlace = lookupPlace(exit.kind, places).getOrElse(this.place);
    this.changeLocation(newPlace);
  };

  @action changeLocation(place: Place) {
    this.place = place;
    this.updateKnownPlaces(place);
  }

  @action updateKnownPlaces(place: Place) {
    if (this.knownPlaces.every(p => p.kind !== place.kind)) {
      this.knownPlaces.push(place);
    }
  }
}

export default Game;
