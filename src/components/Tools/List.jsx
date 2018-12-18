import { connect } from 'react-redux';
import { object } from 'prop-types';
import React, { Component } from 'react';

class List extends Component {
  static propTypes = {

  }

  noop = () => {}

  render() {
    return (
      <div className="list" />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);
