import { connect } from 'react-redux';
import { number, object } from 'prop-types';
import List from './Tools/List';
import React, { Component } from 'react';

class Favorites extends Component {
  static propTypes = {
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

  noop = () => {}

  render() {
    const { winW } = this.props;
    const { emptyType } = this.state;

    return (
      <div className="favorites">
        <List emptyType={emptyType} name="favorites" winW={winW} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
