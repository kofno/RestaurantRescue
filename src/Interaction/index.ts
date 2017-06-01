import ConsoleMessage from './../ConsoleMessage';
import { Thing, ThingKind } from './../Thing';

interface Base {
  label: string;
  message: ConsoleMessage;
}

export interface Examine extends Base {
  kind: 'examine';
}

export interface Take extends Base {
  kind: 'take';
  fromPlace: ThingKind;
  toInventory: Thing;
}

export interface CombineInPlace extends Base {
  kind: 'combine-in-place';
  fromPlace: ThingKind;
  fromInventory: ThingKind;
  failMessage: ConsoleMessage;
  toPlace: Thing;
}

export interface CombineInWorld extends Base {
  kind: 'combine-in-world';
  replaceThing: ThingKind;
  destroyThing: ThingKind;
  failMessage: ConsoleMessage;
  toPlace: Thing;
}

export type Interaction
  = Examine
  | Take
  | CombineInPlace
  | CombineInWorld
  ;

export const examine = (message: ConsoleMessage, label?: string): Interaction => {
  return {
    kind: 'examine',
    label: label || 'Examine',
    message
  };
};

export const take =
  (message: ConsoleMessage, fromPlace: ThingKind, toInventory: Thing, label?: string): Interaction => {
    return {
      kind: 'take',
      label: label || 'Take',
      fromPlace,
      toInventory,
      message,
    };
  };

export const combineInPlace = (
  m: ConsoleMessage,
  fm: ConsoleMessage,
  fromPlace: ThingKind,
  fromInventory: ThingKind,
  toPlace: Thing
): Interaction => {
  return {
    kind: 'combine-in-place',
    label: 'Use',
    fromPlace,
    fromInventory,
    message: m,
    failMessage: fm,
    toPlace,
  };
};

export const combineInWorld = (
  m: ConsoleMessage,
  fm: ConsoleMessage,
  replaceThing: ThingKind,
  destroyThing: ThingKind,
  toPlace: Thing,
  label?: string
): Interaction => {
  return {
    kind: 'combine-in-world',
    label: label || 'Use',
    replaceThing,
    destroyThing,
    message: m,
    failMessage: fm,
    toPlace,
  };
};
