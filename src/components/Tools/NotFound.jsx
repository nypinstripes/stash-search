import React from 'react';
import SvgSymbol from './SvgSymbol';

const NotFound = props => (
  <div className="not-found">
    <h1>Zoink!</h1>
    <div className="not-found-icon">
      <div className="robot-body">
        <SvgSymbol symbolId="#robot-body" />
      </div>
      <div className="robot-face">
        <SvgSymbol symbolId="#robot-eye-left" />
        <SvgSymbol symbolId="#robot-eye-right" />
        <SvgSymbol symbolId="#robot-mouth" />
      </div>
    </div>
    <p>Didn&apos;t find that one.</p>
  </div>
);

export default NotFound;
