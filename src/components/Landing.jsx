import { connect } from 'react-redux';
import { object } from 'prop-types';
import React, { Component } from 'react';

class Landing extends Component {
  static propTypes = {

  }

  noop = () => {}

  render() {
    return (
      <div className="Landing" />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
