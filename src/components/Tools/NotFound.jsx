import { connect } from 'react-redux';
import React, { Component } from 'react';
import SvgSymbol from './SvgSymbol';

class NotFound extends Component {
  static propTypes = {

  }

  noop = () => {}

  render() {
    return (
      <div className="not-found">
        <h1>Whoops!</h1>
        <div className="not-found-icon">
          <SvgSymbol symbolId="#slip" />
        </div>
        <p>Couldn&apos;t find that one.</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
