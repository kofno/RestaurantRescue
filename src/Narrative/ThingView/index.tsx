import * as React from 'react';
import { observer } from 'mobx-react';
import { Thing } from './../../Thing';
import Game from './../../Game';
import { Interaction, isInteractionFor } from './../../Interaction';

interface Props {
  thing: Thing;
  game: Game;
}

const handleInteraction = (game: Game, i: Interaction) => (e: React.SyntheticEvent<HTMLElement>): void => {
  e.preventDefault();
  game.interact(i);
};

const buttonLabel = (interaction: Interaction): string => {
  switch (interaction.kind) {
    case 'examine':
      return interaction.buttonLabel || 'Examine';

    case 'take':
      return interaction.buttonLabel || 'Take';

    case 'combine':
      return interaction.buttonLabel || 'Use';
  }
};

interface ButtonProps {
  onClick: (e: React.SyntheticEvent<HTMLElement>) => void;
  interaction: Interaction;
}

const InteractionButton = observer(({ onClick, interaction }: ButtonProps): JSX.Element => {
  return (
    <a className="button is-small" href="#" onClick={onClick}>
      {buttonLabel(interaction)}
    </a>
  );
});

const ThingView = observer(({ thing, game }: Props): JSX.Element => {
  return (
    <p className="content">
      {thing.description}<br />

      {game.interactions.filter(isInteractionFor(thing))
        .map(i => <InteractionButton onClick={handleInteraction(game, i)} interaction={i} />)
      }

    </p>
  );
});

export default ThingView;
