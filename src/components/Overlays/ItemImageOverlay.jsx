import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import { setCurrentItem } from '../../actions/actionCreators';
import React, { Component } from 'react';

class ItemImageOverlay extends Component {
  static propTypes = {
    currentItem: object,
    setCurrentItem: func
  }

  componentWillUnmount() {
    this.props.setCurrentItem({});
  }

  render() {
    const { currentItem } = this.props;

    if (Object.keys(currentItem).length > 0) {
      return (
        <div className="item-image-overlay-body overlay-content">
          <div className="item-image-overlay-body-content" />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentItem: state.currentItem ? state.currentItem : {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentItem(params) { dispatch(setCurrentItem(params)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemImageOverlay);
