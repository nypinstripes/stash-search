import { withRouter } from 'react-router-dom';
import React from 'react';
import SvgIcon from './SvgIcon';

const NotFound = props => (
  <div className="not-found">
    <h1>Zoink!</h1>
    <div className="not-found-icon">
      <SvgIcon name="robot" />
    </div>
    <p>Didn&apos;t find that one.</p>
  </div>
);

export default withRouter(NotFound);
