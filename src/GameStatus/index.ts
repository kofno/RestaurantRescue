import Place from './../Place';

export interface Loading {
  kind: 'loading';
}

export interface Start {
  kind: 'start';
}

export interface Play {
  kind: 'play';
  place: Place;
}

export interface End {
  kind: 'end';
}

export type GameStatus
  = Loading
  | Start
  | Play
  | End
  ;

export const play = (place: Place): GameStatus => (
  {
    kind: 'play',
    place,
  }
);

export const endGame = (): GameStatus => ({ kind: 'end' });
