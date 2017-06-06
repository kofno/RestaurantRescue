import ConsoleMessage from './../ConsoleMessage';
import { ThingKind } from './../Thing';
import Game from './../Game';

export type Interaction
  = Examine
  | Take
  | Use
  | Summon
  ;

export interface Take {
  kind: 'take';
  message: ConsoleMessage;
  target: ThingKind;
  result: ThingKind;
  label?: string;
}

export interface Examine {
  kind: 'examine';
  message: ConsoleMessage;
  label?: string;
}

export interface Use {
  kind: 'use';
  succeed: ConsoleMessage;
  fail: ConsoleMessage;
  actor: ThingKind;
  target: ThingKind;
  result: ThingKind;
  label?: string;
}

export interface Summon {
  kind: 'summon';
  succeed: ConsoleMessage;
  fail: ConsoleMessage;
  actor: ThingKind;
  target: ThingKind;
  result: ThingKind;
  label?: string;
}

const assertNever = (x: never): never => {
  throw new Error(`Should never get here: ${x}`);
};

const defaultLabel = (i: Interaction): string => {
  switch (i.kind) {
    case 'use': return 'Use';
    case 'take': return 'Take';
    case 'examine': return 'Examine';
    case 'summon': return 'Summon';
  }
};

export const interact = (game: Game, i: Interaction): void => {
  switch (i.kind) {
    case 'examine':
      return game.examine(i.message);

    case 'take':
      return game.take(i.target, i.result, i.message);

    case 'use':
      return game.use(i.actor, i.target, i.result, i.succeed, i.fail);

    case 'summon':
      return game.summon(i.actor, i.target, i.result, i.succeed, i.fail);

    default:
      assertNever(i);
  }
};

export const label = (i: Interaction): string =>
  i.label || defaultLabel(i);

export const interactions = (t: ThingKind): Interaction[] => {
  switch (t) {
    case 'pot-empty':
      return [
        {
          kind: 'examine',
          message: {
            title: 'Examine Empty Pot',
            content: 'It\'s an empty pot. Maybe you could cook something in it.',
          },
        },
      ];

    case 'pot-tomatoes-seasoned':
      return [
        {
          kind: 'examine',
          message: {
            title: 'Examine Pot',
            content: 'There is a pot here with some crushed tomatoes and seasoning in it.',
          }
        },
      ];

    case 'pot-sauce':
      return [
        {
          kind: 'examine',
          message: {
            title: 'Examine Pot',
            content: 'The marinara smells fantastic!',
          }
        },
      ];

    case 'pot-tomatoes':
      return [
        {
          kind: 'examine',
          message: {
            title: 'Examine Pot',
            content: 'There is a pot here with some crushed tomatoes in it.',
          }
        },
      ];

    case 'spices-inventory':
      return [
        {
          kind: 'use',
          succeed: {
            title: 'Use Garlic and Seasonings',
            content: 'You put the garlic and Italian seasonings into the pot'
          },
          fail: {
            title: 'Use Garlic and Seasonings',
            content: 'You cannot use garlic and seasonings here'
          },
          target: 'pot-tomatoes',
          actor: 'spices-inventory',
          result: 'pot-tomatoes-seasoned',
        },
      ];

    case 'spices-pantry':
      return [
        {
          kind: 'take',
          message: {
            title: 'Take Seasonings and Garlic',
            content: 'The Italian Seasonings and Garlic have been taken.',
          },
          target: 'spices-pantry',
          result: 'spices-inventory',
        },
      ];

    case 'tomatoes-inventory':
      return [
        {
          kind: 'use',
          succeed: {
            title: 'Use Tomatoes',
            content: 'You put the tomatoes into the pot and crush them',
          },
          fail: {
            title: 'Use Tomatoes',
            content: 'You cannot tomatoes here',
          },
          target: 'pot-empty',
          actor: 'tomatoes-inventory',
          result: 'pot-tomatoes',
        },
      ];

    case 'tomatoes-vine':
      return [
        {
          kind: 'take',
          message: {
            title: 'Take tomatoes',
            content: 'The tomatoes have been taken.',
          },
          target: 'tomatoes-vine',
          result: 'tomatoes-inventory',
        },
      ];

    case 'spoon-inventory':
      return [
        {
          kind: 'use',
          succeed: {
            title: 'Use Spoon',
            content: 'You stir the ingredients in the pot. Soon a lovely marinara is simmering',
          },
          fail: {
            title: 'Use Spoon',
            content: 'There is nothing to spoon here'
          },
          target: 'pot-tomatoes-seasoned',
          actor: 'spoon-inventory',
          result: 'pot-sauce',
        },
      ];

    case 'spoon-wooden':
      return [
        {
          kind: 'take',
          message: {
            title: 'Take spoon',
            content: 'There is no spoon. J/K. The spoon is taken.',
          },
          target: 'spoon-wooden',
          result: 'spoon-inventory',
        },
      ];

    case 'doors-unlocked':
      return [
        {
          kind: 'examine',
          message: {
            title: 'Unlocked Doors',
            content: 'The doors are unlocked. Looks like you won!',
          }
        },
      ];

    case 'doors-locked':
      return [
        {
          kind: 'summon',
          succeed: {
            title: 'Unlock Doors',
            content: 'The doors are unlocked!',
          },
          fail: {
            title: 'Unlock Doors',
            content: 'You could open the doors, but what would you feed your customers?',
          },
          target: 'doors-locked',
          actor: 'pot-sauce',
          result: 'doors-unlocked',
          label: 'Unlock',
        }
      ];

    default:
      return assertNever(t);
  }
};
