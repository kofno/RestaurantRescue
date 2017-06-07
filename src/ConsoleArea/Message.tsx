import * as React from 'react';
import { observer } from 'mobx-react';
import ConsoleMessage from './../ConsoleMessage';
import Header from './Header';
import Content from './Content';
import Game from './../Game';

interface MessageProps {
  message: ConsoleMessage;
  game: Game;
}

const Message = ({ message, game }: MessageProps): JSX.Element => {
  return (
    <div className="ConsoleArea" key="something">
      <div className="message">
        <Header title={message.title} game={game} />
        <Content content={message.content} />
      </div>
    </div>
  );
};

export default observer(Message);
