import * as React from 'react';
import Game from './../Game';
import { observer } from 'mobx-react';

interface HeaderProps {
  title: string;
  game: Game;
}

const Header = ({ title, game }: HeaderProps): JSX.Element => {
  return (
    <div className="message-header">
      {title}
      <button className="delete" onClick={() => game.closeConsole()} />
    </div>
  );
};

export default observer(Header);
