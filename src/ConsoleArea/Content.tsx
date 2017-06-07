import * as React from 'react';
import { observer } from 'mobx-react';

interface ContentProps {
  content: string;
}

const Content = ({ content }: ContentProps): JSX.Element => {
  return (
    <div className="message-body has-text-centered">
      {content}
    </div>
  );
};

export default observer(Content);
