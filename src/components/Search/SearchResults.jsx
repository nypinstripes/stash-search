import { connect } from 'react-redux';
import { func, number, string } from 'prop-types';
import { setImageSearch, setListItems } from '../../actions/actionCreators';
import List from '../Tools/List';
import queryString from 'query-string';
import React, { Component } from 'react';

class SearchResults extends Component {
  static propTypes = {
    currentTerm: string,
    setImageSearch: func,
    setListItems: func,
    toggleOverlay: func,
    winW: number
  }

  state = {
    currentSearch: '',
    emptyType: {
      icon: 'icon-earth',
      iconType: 'symbol',
      subTitle: "Sorry! We didn't find any results.",
      title: '0 results found'
    },
    goToSearch: null
  }

  componentWillMount() {
    const { setImageSearch } = this.props;
    const { currentSearch } = this.state;
    const { search } = location;

    if (search && search.indexOf('query') !== -1) {
      let queryParams = queryString.parse(search);

      this.setState({ currentSearch: queryParams.query });
      setImageSearch({ query: queryParams.query });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { currentTerm: nextCurrentTerm } = nextProps;
    const { currentTerm } = this.props;

    if (nextCurrentTerm && currentTerm !== nextCurrentTerm) {
      this.setState({ currentSearch: nextCurrentTerm });
    }
  }

  componentWillUnmount() {
    this.props.setListItems([]);
  }

  render() {
    const { toggleOverlay, winW } = this.props;
    const { currentSearch, emptyType, goToSearch } = this.state;

    return (
      <div className="search-results">
        <List
          currentSearch={currentSearch}
          emptyType={emptyType}
          name="results"
          toggleOverlay={toggleOverlay}
          winW={winW}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentTerm: state.currentTerm ? state.currentTerm : ''
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setImageSearch(params) { dispatch(setImageSearch(params)); },
  setListItems(params) { dispatch(setListItems(params)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
