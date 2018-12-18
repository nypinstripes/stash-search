import { connect } from 'react-redux';
import { object } from 'prop-types';
import React, { Component } from 'react';

class Empty extends Component {
  static propTypes = {

  }

  noop = () => {}

  render() {
    return (
      <div className="empty" />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Empty);
