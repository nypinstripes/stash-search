import { connect } from 'react-redux';
import React, { Component } from 'react';
import SvgIcon from './SvgIcon';

class NotFound extends Component {
  static propTypes = {

  }

  noop = () => {}

  render() {
    return (
      <div className="not-found">
        <h1>Zoink!</h1>
        <div className="not-found-icon">
          <SvgIcon name="robot" />
        </div>
        <p>Didn&apos;t find that one.</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
