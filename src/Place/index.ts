import { Maybe, just, nothing } from 'maybeasy';

export const lookupPlace = (kind: string, places: Place[]): Maybe<Place> => {
  const found = places.find(p => p.kind === kind);
  return typeof found === 'undefined'
    ? nothing()
    : just(found);
};

export interface Placeish {
  kind: string;
  description: string;
}

export interface Place extends Placeish {
  name: string;
  exits: Exit[];
}

export interface Exit extends Placeish { }

export const name = (place: Placeish, places: Place[]) =>
  lookupPlace(place.kind, places).map(p => p.name).getOrElse('');

export const places: Place[] = [
  {
    kind: 'kitchen',
    name: 'Large Kitchen',
    description: 'You are in a large kitchen. Like one you might see in a hotel.',
    exits: [
      { kind: 'pantry', description: 'The pantry is to the north.' },
      { kind: 'freezer', description: 'The walk-in freezer is to the northeast.' },
      { kind: 'dining-room', description: 'A dining room is to the south.' },
    ],
  },
  {
    kind: 'pantry',
    name: 'Well Stocked Pantry',
    description: 'You are in a well stocked pantry. The smells from all the '
    + 'seasonings mingle in the air here. You might sneeze.',
    exits: [
      { kind: 'kitchen', description: 'The kitchen is to the south.' },
    ],
  },
  {
    kind: 'freezer',
    name: 'Walk-in Freezer',
    description: 'You are in a walk-in freezer. It is mostly empty. You are quite cold.',
    exits: [
      { kind: 'kitchen', description: 'The door to the kitchen is southeast of here.' },
    ],
  },
  {
    kind: 'dining-room',
    name: 'Fancy Dining Room',
    description: 'You are in a fancy dining room. It is old and has seen better days. '
    + 'The large chandalier in the center of room once might have been spectacular, '
    + 'but now is best described as _mostly lit_.',
    exits: [
      { kind: 'kitchen', description: 'Double doors to the north lead to the kitchen.' },
      { kind: 'reception', description: 'The reception area is south of here.' },
      { kind: 'garden', description: 'A door to the east leads outside to the garden' },
    ],
  },
  {
    kind: 'garden',
    name: 'Over-Grown Garden',
    description: 'You are standing in a garden. A severly neglected garden. Once all '
    + 'the vegetables served in the kitchen were grown here, but not anymore. '
    + 'At least the sun is shining.',
    exits: [
      { kind: 'dining-room', description: 'Doors to the west lead back inside.' },
    ],
  },
  {
    kind: 'reception',
    name: 'Empty Reception Area',
    description: 'You are standing in the reception area. This is where customers are '
    + 'greeted before being taken to their tables. The resturaunt is closed, so this are is '
    + 'empty.',
    exits: [
      { kind: 'dining-room', description: 'A hallway to the east leads back into the dining room.' },
    ],
  }
];
