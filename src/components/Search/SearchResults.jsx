import { connect } from 'react-redux';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import List from '../Tools/List';
import Loader from '../Tools/Loader';
import React, { Component } from 'react';

class SearchResults extends Component {
  static propTypes = {

  }

  state = {
    emptyType: {
      icon: 'icon-earth',
      iconType: 'symbol',
      subTitle: "Sorry! We didn't find any results.",
      title: '0 results found'
    }
  }

  noop = () => {}

  render() {
    const { emptyType } = this.state;

    return (
      <div className="search-results">
        <List emptyType={emptyType} name="Results" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));
