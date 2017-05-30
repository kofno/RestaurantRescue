import { observable, action } from 'mobx';
import { Maybe, nothing, just } from 'maybeasy';
import { Exit, places, lookupPlace } from './../Place';
import { Place } from './../Place';
import * as Thing from './../Thing';
import ConsoleMessage from './../ConsoleMessage';
import * as Interaction from './../Interaction';

const assertNever = (n: never): never => {
  throw new Error(`Type Error; This code should never be reached: ${n}`);
};

class Game {

  @observable place: Place = places[0];

  @observable knownPlaces: Place[] = [places[0]];

  @observable things: Thing.Thing[] = Thing.initialThings;

  @observable consoleMessage: Maybe<ConsoleMessage> = nothing();

  readonly interactions: Interaction.Interaction[] = Interaction.interactions;

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

  @action interact(i: Interaction.Interaction) {
    this.clearConsole();
    switch (i.kind) {
      case 'examine':
        setTimeout(() => this.setConsoleMessage(just(i.message)), 500);
        break;

      case 'take':
        this.removeThing(i.thingId);
        this.placeThing(i.inventoryId, '--inventory--');
        setTimeout(() => this.setConsoleMessage(just(i.message)), 500);
        break;

      case 'combine':
        const target = this.things.find(t => i.targetId === t.kind && (i.targetPlace || this.place.kind) === t.placeId);
        const thing = this.things.find(t => i.thingId === t.kind && i.thingPlace === t.placeId);
        if (thing && target) {
          setTimeout(() => this.setConsoleMessage(just(i.message)), 500);
          this.removeThing(target.kind);
          this.removeThing(thing.kind);
          this.placeThing(i.resultId, i.resultPlace);
        } else {
          setTimeout(() => this.setConsoleMessage(just(i.failureMessage)), 500);
        }
        break;

      default: assertNever(i);
    }
  }

  @action clearConsole() {
    this.consoleMessage = nothing();
  }

  @action setConsoleMessage(m: Maybe<ConsoleMessage>) {
    this.consoleMessage = m;
  }

  @action removeThing(thingId: string) {
    const thing = this.things.find(t => t.kind === thingId);
    if (thing) {
      thing.placeId = undefined;
    }
  };

  @action placeThing(thingId: string, where: string) {
    const thing = this.things.find(t => t.kind === thingId);
    if (thing) {
      thing.placeId = where;
    }
  }
}

export default Game;
