import { observable } from 'mobx';
import { Thing } from './../Thing';
import Exit from './../Exit';

export default class Place {

  readonly exits: Exit[] = [];
  @observable things: Thing[] = [];
  @observable known: boolean = false;

  static kitchen(): Place {
    return new Place(
      'kitchen',
      'Large Kitchen',
      'You are in a large kitchen. Like one you might see in a hotel.'
    );
  };

  static pantry(): Place {
    const desc
      = 'You are in a well stocked pantry. The smells from all the '
      + 'seasonings mingle in the air here. You might sneeze.'
      ;
    return new Place('pantry', 'Well Stocked Pantry', desc);
  }

  static freezer(): Place {
    return new Place(
      'freezer',
      'Walk-in Freezer',
      'You are in a walk-in freezer. It is mostly empty. You are quite cold.',
    );
  }

  static diningRoom(): Place {
    const description
      = 'You are in a fancy dining room. It is old and has seen better days. '
      + 'The large chandalier in the center of room once might have been spectacular, '
      + 'but now is best described as _mostly lit_.'
      ;
    return new Place('dining-room', 'Fancy Dining Room', description);
  }

  static garden(): Place {
    const description
      = 'You are standing in a garden. A severly neglected garden. Once all '
      + 'the vegetables served in the kitchen were grown here, but not anymore. '
      + 'At least the sun is shining.'
      ;
    return new Place('garden', 'Over-Grown Garden', description);
  }

  static reception(): Place {
    const description
      = 'You are standing in the reception area. This is where customers are '
      + 'greeted before being taken to their tables. The resturaunt is closed, so this area is '
      + 'empty.'
      ;
    return new Place('reception', 'Empty Reception Area', description);
  }

  constructor(
    readonly kind: string,
    readonly name: string,
    readonly description: string,
  ) {
  };

  addExits(exits: Exit[]) {
    for (const e of exits) {
      this.exits.push(e);
    }
  }

  addThings(things: Thing[]) {
    this.things = this.things.concat(things);
  }
}
