import { object } from 'prop-types';
import React from 'react';
import SvgIcon from './SvgIcon';
import SvgSymbol from './SvgSymbol';

const Empty = props => (
  <div className="empty">
    <div className="empty-icon-container">
      <div className="pebble" />
      <div className="pebble" />
      <div className="pebble" />
      <div className="empty-icon">
        { props.emptyType.iconType === 'symbol' ?
          <SvgSymbol symbolId={`#${props.emptyType.icon}`} />
          :
          <SvgIcon name={props.emptyType.icon} />
        }
      </div>
    </div>
    <div className="empty-msg">
      <h2>{props.emptyType.title}</h2>
      <p>{props.emptyType.subTitle}</p>
    </div>
  </div>
);

Empty.propTypes = { emptyType: object };

export default Empty;
