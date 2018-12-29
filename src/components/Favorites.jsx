import { connect } from 'react-redux';
import { func, number } from 'prop-types';
import { getFavorites } from '../actions/actionCreators';
import List from './Tools/List';
import React, { Component } from 'react';

class Favorites extends Component {
  static propTypes = {
    getFavorites: func,
    toggleOverlay: func,
    winW: number
  }

  state = {
    emptyType: {
      icon: 'favorite',
      iconType: 'icon',
      subTitle: "Add favorites by clicking the star on any item.",
      title: "You've got no favorites."
    }
  }

  componentWillMount() {
    this.props.getFavorites();
  }

  render() {
    const { toggleOverlay, winW } = this.props;
    const { emptyType } = this.state;

    return (
      <div className="favorites">
        <List emptyType={emptyType}
          name="favorites"
          toggleOverlay={toggleOverlay}
          winW={winW}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getFavorites() { dispatch(getFavorites()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
