import * as React from 'react';
import { observer } from 'mobx-react';
import { CSSTransitionGroup } from 'react-transition-group';
import './FadeIn.css';

const FadeIn = observer((props) => {
  return (
    <CSSTransitionGroup
      className="FadeInContainer"
      component="div"
      transitionName="FadeIn"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      {props.children}
    </CSSTransitionGroup>
  );
});

export default FadeIn;
