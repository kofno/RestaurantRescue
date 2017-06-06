import { observable, action, computed } from 'mobx';
import { PlaceType } from './../Place';
import { ThingKind, ThingLocation, ThingStore, initialState } from './../Thing';
import ConsoleMessage from './../ConsoleMessage';
import * as R from 'ramda';

const thingInLocation = (it: ThingKind, at: ThingStore) =>
  (tl: ThingLocation): boolean => tl.place === at && tl.thing === it;

type GameStatus
  = 'start'
  | 'play'
  | 'end'
  ;

class Game {
  @observable knownPlaces: PlaceType[] = [];
  @observable place?: PlaceType = undefined;
  @observable things: ThingLocation[] = initialState();
  @observable message?: ConsoleMessage = undefined;

  @computed get gameStatus(): GameStatus {
    const gameOver = thingInLocation('doors-unlocked', 'reception');
    if (R.any(gameOver, this.things)) {
      return 'end';
    }
    if (!this.place) {
      return 'start';
    }
    return 'play';
  }

  @action moveTo(place: PlaceType) {
    this.place = place;
    if (!R.contains(place, this.knownPlaces)) {
      this.knownPlaces.push(place);
    }
  };

  @action closeConsole() {
    this.message = undefined;
  }

  @action sendConsoleMessage(m: ConsoleMessage) {
    this.message = undefined;
    setTimeout(action(() => this.message = m), 500);
  }

  @action removeThing(aThing: ThingKind) {
    const remover = (t: ThingLocation) =>
      aThing === t.thing ? { ...t, place: undefined } : t;
    this.things = this.things.map(remover);
  }

  @action putThing(aThing: ThingKind, aPlace: ThingStore) {
    const placer = (t: ThingLocation) =>
      aThing === t.thing ? { ...t, place: aPlace } : t;
    this.things = this.things.map(placer);
  }

  @action examine(message: ConsoleMessage) {
    this.sendConsoleMessage(message);
  }

  @action take(taken: ThingKind, inventory: ThingKind, message: ConsoleMessage) {
    if (!this.place) { return; }
    const thingHere = thingInLocation(taken, this.place);
    if (this.things.some(thingHere)) {
      this.putThing(inventory, 'inventory');
      this.removeThing(taken);
      this.sendConsoleMessage(message);
    }
  }

  @action use(
    actor: ThingKind,
    target: ThingKind,
    result: ThingKind,
    succeed: ConsoleMessage,
    fail: ConsoleMessage
  ) {
    if (!this.place) { return; }
    const thingHere = thingInLocation(target, this.place);
    const holding = thingInLocation(actor, 'inventory');
    if (R.any(thingHere, this.things) && R.any(holding, this.things)) {
      this.removeThing(actor);
      this.removeThing(target);
      this.putThing(result, this.place);
      this.sendConsoleMessage(succeed);
    } else {
      this.sendConsoleMessage(fail);
    }
  }

  @action summon(
    actor: ThingKind,
    target: ThingKind,
    result: ThingKind,
    succeed: ConsoleMessage,
    fail: ConsoleMessage,
  ) {
    if (!this.place) { return; }
    const thingHere = thingInLocation(target, this.place);
    const exists = (tl: ThingLocation) =>
      tl.thing === actor && typeof tl.place !== 'undefined';
    if (R.any(thingHere, this.things) && R.any(exists, this.things)) {
      this.removeThing(actor);
      this.removeThing(target);
      this.putThing(result, this.place);
      this.sendConsoleMessage(succeed);
    } else {
      this.sendConsoleMessage(fail);
    }
  };

  @action resetGame() {
    this.knownPlaces = [];
    this.place = undefined;
    this.things = initialState();
    this.message = undefined;
  };

}

export default Game;
