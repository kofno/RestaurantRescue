import { Interaction } from './../Interaction';
import { examine, take, combineInPlace, combineInWorld } from './../Interaction';

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

export interface Thing {
  kind: ThingKind;
  description: string;
  interactions: Interaction[];
}

export const emptyPot = (): Thing => {
  return {
    kind: 'pot-empty',
    description: 'There\'s an empty pot on the stove.',
    interactions: [
      examine({
        title: 'Examine Empty Pot',
        content: 'It\'s an empty pot. Maybe you could cook something in it.',
      }),
    ],
  };
};

const seasonedTomatoesPot = (): Thing => {
  const description
    = 'There\'s a pot here with crushed tomatoes and seasoning floating on it. '
    + 'If only you had a way to stir it.'
    ;
  return {
    kind: 'pot-tomatoes-seasoned',
    description,
    interactions: [
      examine({
        title: 'Examine Pot',
        content: 'There is a pot here with some crushed tomatoes and seasoning in it.',
      })
    ],
  };
};

export const inventorySpices = (): Thing => {
  return {
    kind: 'spices-inventory',
    description: 'Garlic and Italian seasonings',
    interactions: [
      combineInPlace(
        {
          title: 'Use Garlic and Seasonings',
          content: 'You put the garlic and Italian seasonings into the pot'
        },
        {
          title: 'Use Garlic and Seasonings',
          content: 'You cannot use garlic and seasonings here'
        },
        'pot-tomatoes',
        'spices-inventory',
        seasonedTomatoesPot()
      ),
    ],
  };
};

export const spices = (): Thing => {
  return {
    kind: 'spices-pantry',
    description: 'Garlic and Italian seasonings are here.',
    interactions: [
      take({
        title: 'Take Seasonings and Garlic',
        content: 'The Italian Seasonings and Garlic have been taken.',
      }, 'spices-pantry', inventorySpices()),
    ],
  };
};

const tomatoesPot = (): Thing => {
  return {
    kind: 'pot-tomatoes',
    description: 'There\'s a pot here with crushed tomoatoes in it. Seems bland.',
    interactions: [
      examine({
        title: 'Examine Pot',
        content: 'There is a pot here with some crushed tomatoes in it.',
      }),
    ],
  };
};

export const inventoryTomatoes = (): Thing => {
  return {
    kind: 'tomatoes-inventory',
    description: 'Edible-ish tomatoes',
    interactions: [
      combineInPlace(
        {
          title: 'Use Tomatoes',
          content: 'You put the tomatoes into the pot and crush them'
        },
        {
          title: 'Use Tomatoes',
          content: 'You cannot tomatoes here'
        },
        'pot-empty',
        'tomatoes-inventory',
        tomatoesPot()
      ),
    ],
  };
};

export const tomatoes = (): Thing => {
  const description
    = 'There are a couple of tomatoes growing here. '
    + 'They are hardly impressive, but they seem edible.'
    ;
  return {
    kind: 'tomatoes-vine',
    description,
    interactions: [
      take({
        title: 'Take tomatoes',
        content: 'The tomatoes have been taken.',
      }, 'tomatoes-vine', inventoryTomatoes())
    ],
  };
};

const marinara = (): Thing => {
  return {
    kind: 'pot-sauce',
    description: 'There\'s a pot full of marinara here.',
    interactions: [
      examine({
        title: 'Examine Pot',
        content: 'The marinara smells fantastic!',
      })
    ]
  };
};

const inventorySpoon = (): Thing => {
  return {
    kind: 'spoon-inventory',
    description: 'I\'ve got a wooden spoon',
    interactions: [
      combineInPlace(
        {
          title: 'Use Spoon',
          content: 'You stir the ingredients in the pot. Soon a lovely marinara is simmering',
        },
        {
          title: 'Use Spoon',
          content: 'There is nothing to spoon here'
        },
        'pot-tomatoes-seasoned',
        'spoon-inventory',
        marinara()
      ),
    ]
  };
};

export const spoon = (): Thing => {
  return {
    kind: 'spoon-wooden',
    description: 'Someone inexplicably left a wooden spoon here.',
    interactions: [
      take({
        title: 'Take spoon',
        content: 'There is no spoon. J/K. The spoon is taken.',
      }, 'spoon-wooden', inventorySpoon()),
    ]
  };
};

const unlockedDoors = (): Thing => {
  return {
    kind: 'doors-unlocked',
    description: 'The doors are unlocked.',
    interactions: [
      examine({
        title: 'Unlocked Doors',
        content: 'The doors are unlocked. Looks like you won!',
      }),
    ],
  };
};

export const lockedDoors = (): Thing => {
  return {
    kind: 'doors-locked',
    description: 'No customers will come until the front doors are unlocked.',
    interactions: [
      combineInWorld(
        {
          title: 'Unlock Doors',
          content: 'The doors are unlocked!',
        },
        {
          title: 'Unlock Doors',
          content: 'You could open the doors, but what would you feed your customers?',
        },
        'doors-locked',
        'pot-sauce',
        unlockedDoors(),
        'Unlock'
      ),
    ],
  };
};
