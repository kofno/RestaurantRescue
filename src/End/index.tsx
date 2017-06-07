import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import GameTitle from './../GameTitle';

interface Props {
  game: Game;
}

const handleRestartGame = (game: Game) => (): void => game.resetGame();

const End = ({ game }: Props) => {
  return (
    <div className="section">
      <div className="column is-half is-offset-one-quarter box">
        <nav className="level">
          <p className="level-item has-text-centered">
            <GameTitle game={game} title="Congratulations! You Won!" />
          </p>
        </nav>

        <p className="content">
          Well... sorta. OK, you didn't actually win. All you did was survive
          the first day. It turns out that running a restaurant is really hard
          work. It takes a lot of dedication. If you'd like to continue
          these adventures... well... write your own game.
        </p>

        <p className="content">
          If you'd like to re-play the first day over, click the button.
        </p>

        <div className="has-text-centered">
          <a href="#" className="button is-primary" onClick={handleRestartGame(game)}>
            Start Over
          </a>
        </div>
      </div>
    </div>
  );
};

export default observer(End);
