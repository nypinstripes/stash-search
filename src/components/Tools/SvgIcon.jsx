import React, { Component } from 'react';
import { uniqKey } from '../../utils/helperUtils';
import {
  getCrescentMoon,
  getFavoriteStar,
  getRobotParts
} from '../../utils/svgTemplates';

import { string } from 'prop-types';
// import ReactDOM from 'react-dom';

class SvgIcon extends Component {
  // componentDidMount() {
  //   let rectMark = ReactDOM.findDOMNode(this.refs['rectMark']);
  //   ref="rectMark"
  //   if (rectMark) console.log(`rect: ${rectMark.getTotalLength()}`);
  // }

  static defaultProps = { viewBox: '0 0 100 100' }

  static propTypes = {
    name: string,
    viewBox: string
  }

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

      case 'logo':
        return [
          <circle cx="32.693161"
            cy="15.9312592"
            id="logo-sun"
            key={uniqKey()}
            r="13.9312592"
          />,
          <path d={getCrescentMoon()} id="logo-moon" key={uniqKey()} />
        ];

      case 'logo-text':
        return [
          <path id="logo-text" key={uniqKey()} />
        ];

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
          />,
          <path id="robot-body"
            d={getRobotParts({ part: 'body' })}
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
