import Place from './../Place';
import Exit from './../Exit';
import { emptyPot, spices, tomatoes, spoon, lockedDoors } from './../Thing';

export default class Places {
  static build(): Place[] {
    const kitchen = Place.kitchen();
    const pantry = Place.pantry();
    const freezer = Place.freezer();
    const diningRoom = Place.diningRoom();
    const garden = Place.garden();
    const reception = Place.reception();

    kitchen.known = true;
    kitchen.addExits([
      new Exit(pantry, 'The pantry is to the north.'),
      new Exit(freezer, 'The walk-in freezer is to the northeast.'),
      new Exit(diningRoom, 'A dining room is to the south.'),
    ]);
    kitchen.addThings([emptyPot()]);

    pantry.addExits([new Exit(kitchen, 'The kitchen is to the south.')]);
    pantry.addThings([spices()]);

    freezer.addExits([
      new Exit(kitchen, 'The door to the kitchen is southeast of here.')
    ]);
    freezer.addThings([spoon()]);

    diningRoom.addExits([
      new Exit(kitchen, 'Double doors to the north lead to the kitchen.'),
      new Exit(garden, 'A door to the east leads outside to the garden'),
      new Exit(reception, 'The reception area is south of here.'),
    ]);

    garden.addExits([new Exit(diningRoom, 'Doors to the west lead back inside.')]);
    garden.addThings([tomatoes()]);

    reception.addExits([
      new Exit(diningRoom, 'A hallway to the east leads back into the dining room.'),
    ]);
    reception.addThings([lockedDoors()]);

    return [
      kitchen,
      pantry,
      freezer,
      diningRoom,
      garden,
      reception,
    ];
  }
}
