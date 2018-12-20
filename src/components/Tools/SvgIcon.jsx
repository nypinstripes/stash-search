import React, { Component } from 'react';
import { uniqKey } from '../../utils/helperUtils';
import {
  getFavoriteStar,
  getLogoParts,
  getRobotParts
} from '../../utils/svgTemplates';

import { string } from 'prop-types';

class SvgIcon extends Component {
  static defaultProps = { viewBox: '0 0 100 100' }

  static propTypes = {
    name: string,
    viewBox: string
  }

  // Utility For measuring path stroke lengths. Called from componentDidMount().
  // Requires: import ReactDOM from 'react-dom'; Use DomNodeRef: ref="rectMark".
  //
  // getStrokeLength = () => {
  //   let rectMark = ReactDOM.findDOMNode(this.refs['rectMark']);
  //
  //   if (rectMark) console.log(`rect: ${rectMark.getTotalLength()}`);
  // }

  getIconByName = () => {
    switch(this.props.name) {
      case 'arrow':
        return (
          <g>
            <path className="arrow-left" d="M30 .3160732l21 21.3678543" />
            <path className="arrow-right" d="M30 .3160732L9.020273 21.683927" />
            <path className="arrow-center" d="M30 59.8499985V.3160732" />
          </g>
        );

      case 'favorite':
        return <path d={getFavoriteStar()} id="favorite-star" />;

      case 'logo-pic':
        return [
          <path id="logo-moon" key={uniqKey()} d={getLogoParts('logo-moon')} />,
          <circle cx="24" cy="26" id="logo-sun" key={uniqKey()} r="8" />
        ];

      case 'logo-blobs':
        return [
          <path d="M17.6736908 8.8090611l15.3277321.00492"
            key={uniqKey()}
            id="logo-blob-top"
          />,
          <path d="M48.1648979 123.1919937l15.3277283.004921"
            key={uniqKey()}
            id="logo-blob-bottom"
          />
        ];

      case 'logo-letter-a':
        return <path d={getLogoParts('logo-a')} id="logo-a" key={uniqKey()} />;

      case 'robot':
        return [
          <path id="robot-eye-left"
            d={getRobotParts({ part: 'eye-left' })}
            key={uniqKey()}
          />,
          <path id="robot-eye-right"
            d={getRobotParts({ part: 'eye-right' })}
            key={uniqKey()}
          />,
          <path id="robot-mouth"
            d={getRobotParts({ part: 'mouth' })}
            key={uniqKey()}
          />
        ];

      default: return '';
    }
  }

  render() {
    return (
      <svg className="svg-icon-container"
        height="100%"
        viewBox={this.props.viewBox}
        width="100%"
      >
        { this.getIconByName() }
      </svg>
    );
  }
}

export default SvgIcon;
