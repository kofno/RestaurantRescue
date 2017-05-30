export interface Thing {
  kind: string;
  placeId?: string;
  description: string;
}

export const locatedIn = (placeId: string) => (thing: Thing): boolean =>
  thing.placeId === placeId;

export const initialThings = [
  {
    kind: 'pot-empty',
    placeId: 'kitchen',
    description: 'There\'s an empty pot on the stove.',
  },
  {
    kind: 'pot-crushed-tomatoes',
    placeId: undefined,
    description: 'There\'s a pot here with crushed tomoatoes in it. Seems bland.',
  },
  {
    kind: 'pot-seasoned-tomatoes',
    placeId: undefined,
    description: 'There\'s a pot here with crushed tomatoes and seasoning floating on it. '
    + 'If only you had a way to stir it.',
  },
  {
    kind: 'pot-sauce',
    placeId: undefined,
    description: 'There\'s a pot full of marinara here.'
  },
  {
    kind: 'tomoatoes-vine',
    placeId: 'garden',
    description: 'There are a couple of tomatoes growing here. '
    + 'They are hardly impressive, but they seem edible.',
  },
  {
    kind: 'tomatoes-plucked',
    placeId: undefined,
    description: 'Edible-ish tomatoes',
  },
  {
    kind: 'spoon-wooden',
    placeId: 'freezer',
    description: 'Someone inexplicably left a wooden spoon here.',
  },
  {
    kind: 'spoon-inventory',
    placeId: undefined,
    description: 'A wooden spoon',
  },
  {
    kind: 'doors-locked',
    placeId: 'reception',
    description: 'No customers will come until the front doors are unlocked.',
  },
  {
    kind: 'doors-unlocked',
    placeId: undefined,
    description: 'The doors are unlocked.',
  },
  {
    kind: 'seasonings-pantry',
    placeId: 'pantry',
    description: 'Garlic and Italian seasonings are here.',
  },
  {
    kind: 'seasonings-inventory',
    placeId: undefined,
    description: 'Garlic and Italian sasonings',
  },
];
