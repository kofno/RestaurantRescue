import { observable, computed, action, reaction } from 'mobx';
import Place from './../Place';
import Places from './../Places';
import { Thing, ThingKind } from './../Thing';
import { Interaction } from './../Interaction';
import ConsoleMessage from './../ConsoleMessage';
import { GameStatus, play, endGame } from './../GameStatus';

const assertNever = (x: never): never => {
  throw new Error(`Unexpected switch fall through: ${x}`);
};

class Game {

  @observable places: Place[] = Places.build();

  @observable gameStatus: GameStatus = { kind: 'start' };

  @observable inventory: Thing[] = [];

  @observable consoleMessage?: ConsoleMessage;

  checkEndGame = reaction(
    () => this.places.some(p => p.things.some(t => t.kind === 'doors-unlocked')),
    (gameOver: boolean) => this.gameStatus = endGame()
  );

  @computed get knownPlaces(): Place[] {
    return this.places.filter(p => p.known);
  }

  @action moveTo(place: Place) {
    this.gameStatus = play(place);
    place.known = true;
  };

  @action sendConsoleMessage(m: ConsoleMessage) {
    this.clearConsole();
    setTimeout(() => this.setConsoleMessage(m), 500);
  }

  @action clearConsole() {
    this.consoleMessage = undefined;
  }

  @action setConsoleMessage(m: ConsoleMessage): void {
    this.consoleMessage = m;
  }

  @action removeFromPlace(aKind: string, place: Place): void {
    place.things = place.things.filter(f => f.kind !== aKind);
  }

  @action removeFromInventory(aKind: string): void {
    this.inventory = this.inventory.filter(f => f.kind !== aKind);
  }

  @action removeFromWorld(aKind: string): void {
    for (const p of this.places) {
      this.removeFromPlace(aKind, p);
    }
  }

  @action interact(interaction: Interaction): void {
    if (this.gameStatus.kind !== 'play') { return; }
    switch (interaction.kind) {
      case 'examine':
        this.sendConsoleMessage(interaction.message);
        break;

      case 'take':
        if (this.thingIsInPlace(interaction.fromPlace)) {
          this.sendConsoleMessage(interaction.message);
          this.inventory.push(interaction.toInventory);
          this.removeFromPlace(interaction.fromPlace, this.gameStatus.place);
        }
        break;

      case 'combine-in-place':
        if (this.thingIsInPlace(interaction.fromPlace)
          && this.thingIsInInventory(interaction.fromInventory)) {
          const place = this.gameStatus.place;
          this.sendConsoleMessage(interaction.message);
          this.removeFromInventory(interaction.fromInventory);
          this.removeFromPlace(interaction.fromPlace, place);
          place.things.push(interaction.toPlace);
        } else {
          this.sendConsoleMessage(interaction.failMessage);
        }
        break;

      case 'combine-in-world':
        if (this.thingIsInPlace(interaction.replaceThing)
          && this.thingIsInWorld(interaction.destroyThing)) {
          const place = this.gameStatus.place;
          this.sendConsoleMessage(interaction.message);
          this.removeFromWorld(interaction.destroyThing);
          this.removeFromPlace(interaction.replaceThing, place);
          place.things.push(interaction.toPlace);
        } else {
          this.sendConsoleMessage(interaction.failMessage);
        }
        break;

      default:
        assertNever(interaction);
    }
  };

  @action resetGame() {
    this.resetInventory();
    this.resetPlaces();
    this.startGame();
    this.clearConsole();
  };

  @action resetPlaces() {
    this.places = Places.build();
  }

  @action resetInventory() {
    this.inventory = [];
  }

  @action startGame() {
    this.gameStatus = { kind: 'start' };
  }

  thingIsInPlace(aKind: ThingKind): boolean {
    if (this.gameStatus.kind !== 'play') { return false; }
    return this.gameStatus.place.things.some(t => t.kind === aKind);
  }

  thingIsInInventory(aKind: ThingKind): boolean {
    return this.inventory.some(t => t.kind === aKind);
  }

  thingIsInWorld(aKind: ThingKind): boolean {
    return this.places.some(p => p.things.some(t => t.kind === aKind));
  }

}

export default Game;
