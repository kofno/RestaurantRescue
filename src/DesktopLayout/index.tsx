import * as React from 'react';

interface Props {
  narrative: JSX.Element;
  places: JSX.Element;
  inventory: JSX.Element;
}

const DesktopLayout = (props: Props): JSX.Element => {
  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <div className="tile is-child box">
                  {props.narrative}
                </div>
              </div>
              <div className="tile is-vertical is-parent is-4">
                <div className="tile is-child box">
                  {props.places}
                </div>
                <div className="tile is-child box">
                  {props.inventory}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
