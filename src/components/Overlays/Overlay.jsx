import { camelizeString } from '../../utils/helperUtils';
import { connect } from 'react-redux';
import { bool, func, number, object, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import DefaultOverlay from './DefaultOverlay';
import ItemImageOverlay from './ItemImageOverlay';
import React, { Component } from 'react';

const components = {
  default: DefaultOverlay,
  itemImage: ItemImageOverlay
};


class Overlay extends Component {
  static propTypes = {
    disposeOverlay: func,
    overlayActive: bool,
    overlayData: object,
    overlayLocked: bool,
    overlayName: string,
    scrollOffset: number,
    toggleOverlay: func,
    winW: number
  }

  state = {
    currentOverlayName: 'default'
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentOverlayName: nextProps.overlayName });
  }

  getOverlay = name => {
    const {
      disposeOverlay,
      overlayActive,
      overlayData,
      toggleOverlay,
      winW
    } = this.props;

    const NamedOverlay = components[camelizeString(name)];

    if (overlayActive === true) {
      return <NamedOverlay disposeOverlay={disposeOverlay}
        overlayData={overlayData}
        toggleOverlay={toggleOverlay}
        winW={winW}
      />;
    }
  }

  getOverlayClass = name => {
    const { overlayActive, overlayLocked } = this.props;
    let visibility = overlayActive === true ? 'revealed' : 'concealed';
    let locked = overlayLocked === true ? ' overlay-locked' : '';
    let overlayClass;

    if (name !== '') {
      overlayClass = ` ${name}-overlay ${visibility}${locked}`;
    } else {
      overlayClass = '';
    }

    return `overlay${overlayClass}`;
  }

  getOverlayContainer = () => {
    const { currentOverlayName } = this.state;
    let containerClass = 'overlay-container dynamic-overlay-container';
    let overlayClass = `${currentOverlayName}-overlay-container`;

    return (
      <div className={`${containerClass} ${overlayClass}`}>
        {this.getOverlay(currentOverlayName)}
      </div>
    );
  }

  shouldOverlayDispose = e => {
    const { disposeOverlay, overlayLocked } = this.props;

    return overlayLocked ? e.stopPropagation() : disposeOverlay(e);
  }

  render() {
    const { disposeOverlay, scrollOffset } = this.props;
    const { currentOverlayName } = this.state;

    return (
      <div className={`${this.getOverlayClass(currentOverlayName)}`}
        onClick={this.shouldOverlayDispose}
        style={{ right: `${scrollOffset}px` }}
      >
        <div className="overlay-close"
          onClick={disposeOverlay}
          role="Button"
          tabIndex="0"
          title="Close Overlay"
        />
        { this.getOverlayContainer() }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  scrollOffset: state.scrollOffset ? state.scrollOffset : 0
});

export default withRouter(connect(mapStateToProps)(Overlay));
