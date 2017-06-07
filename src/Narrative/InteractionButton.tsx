import * as React from 'react';
import { observer } from 'mobx-react';

interface ButtonProps {
  onClick: (e: React.SyntheticEvent<HTMLElement>) => void;
  label: string;
}

const InteractionButton = ({ onClick, label }: ButtonProps): JSX.Element => {
  return (
    <a className="button is-small" href="#" onClick={onClick}>
      {label}
    </a>
  );
};

export default observer(InteractionButton);
