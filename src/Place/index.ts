export type PlaceType
  = 'kitchen'
  | 'pantry'
  | 'freezer'
  | 'dining-room'
  | 'garden'
  | 'reception'
  ;

export interface Exit {
  place: PlaceType;
  description: string;
}

const exit = (place: PlaceType, description: string): Exit => ({ place, description });

export const name = (p: PlaceType): string => {
  switch (p) {
    case 'kitchen':
      return 'Large Kitchen';

    case 'pantry':
      return 'Well Stocked Pantry';

    case 'freezer':
      return 'Walk-in Freezer';

    case 'dining-room':
      return 'Fancy Dining Room';

    case 'garden':
      return 'Over-Grown Garden';

    case 'reception':
      return 'Empty Reception Area';
  }
};

export const description = (p: PlaceType): string => {
  switch (p) {
    case 'kitchen':
      return 'You are in a large kitchen. Like one you might see in a hotel.';

    case 'pantry':
      return (
        'You are in a well stocked pantry. The smells from all the ' +
        'seasonings mingle in the air here. You might sneeze.'
      );

    case 'freezer':
      return 'You are in a walk-in freezer. It is mostly empty. You are quite cold.';

    case 'dining-room':
      return (
        'You are in a fancy dining room. It is old and has seen better days. ' +
        'The large chandalier in the center of room once might have been spectacular, ' +
        'but now is best described as _mostly lit_.'
      );

    case 'garden':
      return (
        'You are standing in a garden. A severly neglected garden. Once all ' +
        'the vegetables served in the kitchen were grown here, but not anymore. ' +
        'At least the sun is shining.'
      );

    case 'reception':
      return (
        'You are standing in the reception area. This is where customers are ' +
        'greeted before being taken to their tables. The resturaunt is closed, so this area is ' +
        'empty.'
      );
  }
};

export const exits = (p: PlaceType): Exit[] => {
  switch (p) {
    case 'kitchen':
      return [
        exit('pantry', 'The pantry is to the north.'),
        exit('freezer', 'The walk-in freezer is to the northeast.'),
        exit('dining-room', 'A dining room is to the south.'),
      ];

    case 'pantry':
      return [
        exit('kitchen', 'The kitchen is to the south.')
      ];

    case 'freezer':
      return [
        exit('kitchen', 'The door to the kitchen is southeast of here.')
      ];

    case 'dining-room':
      return [
        exit('kitchen', 'Double doors to the north lead to the kitchen.'),
        exit('garden', 'A door to the east leads outside to the garden'),
        exit('reception', 'The reception area is south of here.'),
      ];

    case 'garden':
      return [
        exit('dining-room', 'Doors to the west lead back inside.')
      ];

    case 'reception':
      return [
        exit('dining-room', 'A hallway to the east leads back into the dining room.'),
      ];

  }
};
