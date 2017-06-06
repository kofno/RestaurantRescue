import * as React from 'react';
import { observer } from 'mobx-react';
import Game from './../Game';
import GameTitle from './../GameTitle';

interface Props {
  game: Game;
}

const handleStartGame = ((game: Game) => (): void => {
  game.moveTo('kitchen');
});

const Start = observer(({ game }: Props): JSX.Element => {
  return (
    <div className="section">
      <div className="column is-half is-offset-one-quarter box">
        <nav className="level">
          <div className="level-item has-text-centered">
            <GameTitle game={game} />
          </div>
        </nav>

        <p className="content">
          Welp, you've found yourself as the owner of your deceased aunt's
          restaurant. In it's hey day, the restaurant was a popular hot spot, famous
          for it's quality food. But as your aunt's health declined, the restaurant
          also fell into disrepair. It's now your responsibilty to restore this
          restaurant  to it's former glory or, at the very least, return it to
          good enough condition sell. However, every journey begins with a step.
          You open soon and you need something to serve to customers.
        </p>

        <div className="has-text-centered">
          <a href="#" className="button is-primary" onClick={handleStartGame(game)}>
            Start the Game
          </a>
        </div>
      </div>
    </div>
  );
});

export default Start;
