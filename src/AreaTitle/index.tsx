import * as React from 'react';
import { observer } from 'mobx-react';

interface Props {
  text: string;
};

const AreaTitle = ({ text }: Props) =>
  <p className="title is-5">{text}</p>;

export default observer(AreaTitle);
