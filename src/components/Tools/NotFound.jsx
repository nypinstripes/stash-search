import { withRouter } from 'react-router-dom';
import React from 'react';
import SvgIcon from './SvgIcon';
import SvgSymbol from './SvgSymbol';

const NotFound = props => (
  <div className="not-found">
    <h1>Zoink!</h1>
    <div className="not-found-icon">
      <div className="robot-body">
        <SvgSymbol symbolId="#robot-body" />
      </div>
      <div className="robot-face">
        <SvgIcon name="robot" />
      </div>
    </div>
    <p>Didn&apos;t find that one.</p>
  </div>
);

export default withRouter(NotFound);
