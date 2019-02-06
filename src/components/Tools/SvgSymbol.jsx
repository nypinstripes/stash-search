import React from 'react';
import { string } from 'prop-types';

const SvgSymbol = props => (
  <svg width="0" height="0">
    <use className={props.symbolId.replace('#', '')} xlinkHref={props.symbolId} x="0" y="0" />
  </svg>
);

SvgSymbol.propTypes = { symbolId: string };

export default SvgSymbol;
