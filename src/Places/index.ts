import { Maybe, just, nothing } from 'maybeasy';

export const lookupPlace = (kind: string, places: Place[]): Maybe<Place> => {
  const found = places.find(p => p.kind === kind);
  return typeof found === 'undefined'
    ? nothing()
    : just(found);
};

export interface Place {
  kind: string;
  name: string;
  description: string;
  refs: LocationRef[];
}

export interface LocationRef {
  id: string;
  summary: string;
}

export type LocationChangeFn = (kind: string) => void;

export const places = [
  {
    kind: 'kitchen',
    name: 'Large Kitchen',
    description: 'You are in a large kitchen. Like one you might see in a hotel.',
    refs: [
      { id: 'pantry', summary: 'The pantry is to the north.' },
      { id: 'freezer', summary: 'The walk-in freezer is to the northeast.' },
      { id: 'dining-room', summary: 'A dining room is to the south.' },
    ],
  },
  {
    kind: 'pantry',
    name: 'Well Stocked Pantry',
    description: 'You are in a well stocked pantry. The smells from all the '
    + 'seasonings mingle in the air here. You might sneeze.',
    refs: [
      { id: 'kitchen', summary: 'The kitchen is to the south.' },
    ],
  },
  {
    kind: 'freezer',
    name: 'Walk-in Freezer',
    description: 'You are in a walk-in freezer. It is mostly empty. You are quite cold.',
    refs: [
      { id: 'kitchen', summary: 'The door to the kitchen is southeast of here.' },
    ],
  },
  {
    kind: 'dining-room',
    name: 'Fancy Dining Room',
    description: 'You are in a fancy dining room. It is old and has seen better days. '
    + 'The large chandalier in the center of room once might have been spectacular, '
    + 'but now is best described as _mostly lit_.',
    refs: [
      { id: 'kitchen', summary: 'Double doors to the north lead to the kitchen' },
      { id: 'reception', summary: 'The reception area is south of here.' },
      { id: 'garden', summary: 'A door to the east leads outside to the garden' },
    ],
  },
  {
    kind: 'garden',
    name: 'Over-Grown Garden',
    description: 'You are standing in a garden. A severly neglected garden. Once all '
    + 'the vegetables served in the kitchen were grown here, but not anymore. '
    + 'At least the sun is shining.',
    refs: [
      { id: 'dining-room', summary: 'Doors to the west lead back inside.' },
    ],
  },
  {
    kind: 'reception',
    name: 'Empty Reception Area',
    description: 'You are standing in the reception area. This is where customers are '
    + 'greeted before being taken to their tables. The resturaunt is closed, so this are is '
    + 'empty.',
    refs: [
      { id: 'dining-room', summary: 'A hallway to the east leads back into the dining room.' },
    ],
  }
];
