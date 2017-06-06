import { PlaceType } from './../Place';

export type ThingKind
  = 'pot-empty'
  | 'pot-tomatoes'
  | 'pot-tomatoes-seasoned'
  | 'pot-sauce'

  | 'spices-inventory'
  | 'spices-pantry'

  | 'tomatoes-inventory'
  | 'tomatoes-vine'

  | 'spoon-inventory'
  | 'spoon-wooden'

  | 'doors-locked'
  | 'doors-unlocked'
  ;

export type ThingStore = PlaceType | 'inventory';

export interface ThingLocation {
  thing: ThingKind;
  place?: ThingStore;
}

export const initialState = (): ThingLocation[] => ([
  { thing: 'pot-empty', place: 'kitchen' },
  { thing: 'pot-tomatoes', place: undefined },
  { thing: 'pot-tomatoes-seasoned', place: undefined },
  { thing: 'pot-sauce', place: undefined },
  { thing: 'spices-inventory', place: undefined },
  { thing: 'spices-pantry', place: 'pantry' },
  { thing: 'tomatoes-inventory', place: undefined },
  { thing: 'tomatoes-vine', place: 'garden' },
  { thing: 'spoon-inventory', place: undefined },
  { thing: 'spoon-wooden', place: 'freezer' },
  { thing: 'doors-locked', place: 'reception' },
  { thing: 'doors-unlocked', place: undefined },
]);

export const description = (tk: ThingKind): string => {
  switch (tk) {
    case 'pot-empty':
      return 'There\'s an empty pot on the stove.';

    case 'pot-tomatoes':
      return 'There\'s a pot here with crushed tomoatoes in it. Seems bland.';

    case 'pot-tomatoes-seasoned':
      return (
        'There\'s a pot here with crushed tomatoes and seasoning floating on it. '
        + 'If only you had a way to stir it.'
      );

    case 'pot-sauce':
      return 'There\'s a pot full of marinara here.';

    case 'spices-inventory':
      return 'Garlic and Italian seasonings';

    case 'spices-pantry':
      return 'Garlic and Italian seasonings are here.';

    case 'tomatoes-inventory':
      return 'Edible-ish tomatoes';

    case 'tomatoes-vine':
      return (
        'There are a couple of tomatoes growing here. '
        + 'They are hardly impressive, but they seem edible.'
      );

    case 'spoon-inventory':
      return 'I\'ve got a wooden spoon';

    case 'spoon-wooden':
      return 'Someone inexplicably left a wooden spoon here.';

    case 'doors-locked':
      return 'No customers will come until the front doors are unlocked.';

    case 'doors-unlocked':
      return 'The doors are unlocked.';
  }
};
