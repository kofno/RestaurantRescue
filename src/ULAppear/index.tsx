import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { observer } from 'mobx-react';
import './ULAppear.css';

const ULAppear = observer((props) => {
  return (
    <CSSTransitionGroup
      component="ul"
      transitionName="ULAppear"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {props.children}
    </CSSTransitionGroup >
  );
});

export default ULAppear;
