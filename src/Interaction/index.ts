import ConsoleMessage from './../ConsoleMessage';
import { Thing } from './../Thing';
import { inventoryPlaceId } from './../Inventory';

interface Base {
  thingId: string;
  message: ConsoleMessage;
  buttonLabel?: string;
}

export interface Examine extends Base {
  kind: 'examine';
}

export interface Take extends Base {
  kind: 'take';
  inventoryId: string;
}

export interface Combine extends Base {
  kind: 'combine';
  thingPlace: string;
  targetId: string;
  targetPlace?: string;
  resultId: string;
  resultPlace: string;
  failureMessage: ConsoleMessage;
}

export type Interaction
  = Examine
  | Take
  | Combine
  ;

export const interactions: Interaction[] = [
  {
    kind: 'examine',
    thingId: 'pot-empty',
    message: {
      title: 'Examine Empty Pot',
      content: 'It\'s an empty pot. Maybe you could cook something in it.',
    },
  },
  {
    kind: 'examine',
    thingId: 'pot-crushed-tomatoes',
    message: {
      title: 'Examine Pot',
      content: 'There is a pot here with some crushed tomatoes in it.',
    },
  },
  {
    kind: 'examine',
    thingId: 'pot-seasoned-tomatoes',
    message: {
      title: 'Examine Pot',
      content: 'There is a pot here with some crushed tomatoes and seasoning in it.',
    },
  },
  {
    kind: 'examine',
    thingId: 'pot-sauce',
    message: {
      title: 'Examine Pot',
      content: 'The marinara smells lovely.',
    },
  },
  {
    kind: 'take',
    thingId: 'seasonings-pantry',
    inventoryId: 'seasonings-inventory',
    message: {
      title: 'Take Seasonings and Garlic',
      content: 'The Italian Seasonings and Garlic have been taken.',
    },
  },
  {
    kind: 'take',
    thingId: 'tomoatoes-vine',
    inventoryId: 'tomatoes-plucked',
    message: {
      title: 'Take tomatoes',
      content: 'The tomatoes have been taken.',
    },
  },
  {
    kind: 'take',
    thingId: 'spoon-wooden',
    inventoryId: 'spoon-inventory',
    message: {
      title: 'Take spoon',
      content: 'There is no spoon. J/K. The spoon is taken.',
    },
  },
  {
    kind: 'combine',
    thingId: 'doors-locked',
    thingPlace: 'reception',
    targetId: 'pot-sauce',
    targetPlace: 'kitchen',
    resultId: 'doors-unlocked',
    resultPlace: 'reception',
    buttonLabel: 'Unlock',
    message: {
      title: 'Unlock doors',
      content: 'The doors are open.',
    },
    failureMessage: {
      title: 'Unlock doors',
      content: 'You could open the doors, but what would you feed your customers?',
    },
  },
  {
    kind: 'combine',
    thingId: 'tomatoes-plucked',
    thingPlace: inventoryPlaceId,
    targetId: 'pot-empty',
    resultId: 'pot-crushed-tomatoes',
    resultPlace: 'kitchen',
    message: {
      title: 'Use tomatoes',
      content: 'You put the tomatoes in the pot and crush them.'
    },
    failureMessage: {
      title: 'Use tomatoes',
      content: 'You can\'t use the tomatoes here.'
    },
  },
  {
    kind: 'combine',
    thingId: 'seasonings-inventory',
    thingPlace: inventoryPlaceId,
    targetId: 'pot-crushed-tomatoes',
    resultId: 'pot-seasoned-tomatoes',
    resultPlace: 'kitchen',
    message: {
      title: 'Use garlic and spices',
      content: 'You dump the seasonings and garlic into the pot',
    },
    failureMessage: {
      title: 'Use garlic and spices',
      content: 'You cannot use the spices and garlic here.',
    },
  },
  {
    kind: 'combine',
    thingId: 'spoon-inventory',
    thingPlace: inventoryPlaceId,
    targetId: 'pot-seasoned-tomatoes',
    resultId: 'pot-sauce',
    resultPlace: 'kitchen',
    message: {
      title: 'Use the spoon',
      content: 'You stir the pot, and soon you\'ve got a lovely marinara simmering',
    },
    failureMessage: {
      title: 'Use the spoon',
      content: 'You cannot use the spoon here.',
    },
  },
];

export const isInteractionFor = (t: Thing) => (i: Interaction): boolean =>
  t.kind === i.thingId;
