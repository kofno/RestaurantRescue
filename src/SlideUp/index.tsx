import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { observer } from 'mobx-react';
import './SlideUp.css';

const SlideUp = observer(props => {
  return (
    <CSSTransitionGroup
      transitionName="SlideUp"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {props.children}
    </CSSTransitionGroup >
  );
});

export default SlideUp;
