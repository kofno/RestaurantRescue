import { observable, computed, action } from 'mobx';
import Place from './../Place';
import Places from './../Places';
import { Thing } from './../Thing';
import { Interaction } from './../Interaction';
import ConsoleMessage from './../ConsoleMessage';

const assertNever = (x: never): never => {
  throw new Error(`Unexpected switch fall through: ${x}`);
};

class Game {

  @observable places: Place[] = Places.build();

  @observable place?: Place = this.places[0];

  @observable inventory: Thing[] = [];

  @observable consoleMessage?: ConsoleMessage;

  @computed get knownPlaces(): Place[] {
    return this.places.filter(p => p.known);
  }

  @action moveTo(place: Place) {
    this.place = place;
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
    switch (interaction.kind) {
      case 'examine':
        this.sendConsoleMessage(interaction.message);
        break;

      case 'take':
        if (this.thingIsInPlace(interaction.fromPlace)) {
          this.sendConsoleMessage(interaction.message);
          this.inventory.push(interaction.toInventory);
          if (this.place) {
            this.removeFromPlace(interaction.fromPlace, this.place);
          }
        }
        break;

      case 'combine-in-place':
        if (this.thingIsInPlace(interaction.fromPlace) && this.thingIsInInventory(interaction.fromInventory)) {
          this.sendConsoleMessage(interaction.message);
          this.removeFromInventory(interaction.fromInventory);
          if (this.place) {
            this.removeFromPlace(interaction.fromPlace, this.place);
            this.place.things.push(interaction.toPlace);
          }
        } else {
          this.sendConsoleMessage(interaction.failMessage);
        }
        break;

      case 'combine-in-world':
        if (this.thingIsInPlace(interaction.replaceThing) && this.thingIsInWorld(interaction.destroyThing)) {
          this.sendConsoleMessage(interaction.message);
          this.removeFromWorld(interaction.destroyThing);
          if (this.place) {
            this.removeFromPlace(interaction.replaceThing, this.place);
            this.place.things.push(interaction.toPlace);
          }
        } else {
          this.sendConsoleMessage(interaction.failMessage);
        }
        break;

      default:
        assertNever(interaction);
    }
  };

  thingIsInPlace(aKind: string): boolean {
    if (typeof this.place === 'undefined') { return false; }
    return this.place.things.some(t => t.kind === aKind);
  }

  thingIsInInventory(aKind: string): boolean {
    return this.inventory.some(t => t.kind === aKind);
  }

  thingIsInWorld(aKind: string): boolean {
    return this.places.some(p => p.things.some(t => t.kind === aKind));
  }

}

export default Game;
