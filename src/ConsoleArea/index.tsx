import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import SlideUp from './../SlideUp';
import Message from './Message';
import './ConsoleArea.css';

interface ConsoleProps {
  game: Game;
}

const ConsoleArea = ({ game }: ConsoleProps): JSX.Element => {
  return (
    <SlideUp>
      {typeof game.message === 'undefined'
        ? <div key="nothing" className="ConsoleArea" />
        : <Message key={game.message.title} message={game.message} game={game} />
      }
    </SlideUp>
  );
};

export default observer(ConsoleArea);
