import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import ConsoleMessage from './../ConsoleMessage';
import SlideUp from './../SlideUp';
import './ConsoleArea.css';

const handleCloseConsole = (game: Game) => (): void =>
  game.clearConsole();

interface HeaderProps {
  title: string;
  game: Game;
}

const Header = observer(({ title, game }: HeaderProps): JSX.Element => {
  return (
    <div className="message-header">
      {title}
      <button className="delete" onClick={handleCloseConsole(game)} />
    </div>
  );
});

interface ContentProps {
  content: string;
}

const Content = observer(({ content }: ContentProps): JSX.Element => {
  return (
    <div className="message-body has-text-centered">
      {content}
    </div>
  );
});

interface MessageProps {
  message: ConsoleMessage;
  game: Game;
}

const Message = observer(({ message, game }: MessageProps): JSX.Element => {
  return (
    <div className="ConsoleArea" key="something">
      <div className="message">
        <Header title={message.title} game={game} />
        <Content content={message.content} />
      </div>
    </div>
  );
});

interface ConsoleProps {
  game: Game;
}

const ConsoleArea = observer(({ game }: ConsoleProps): JSX.Element => {
  return (
    <SlideUp>
      {game.consoleMessage.cata({
        Nothing: () => <div key="nothing" className="ConsoleArea" />,
        Just: (m) => <Message message={m} game={game} />,
      })}
    </SlideUp>
  );
});

export default ConsoleArea;
