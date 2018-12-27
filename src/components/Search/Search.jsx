import { connect } from 'react-redux';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

class Search extends Component {
  static propTypes = {
    history: object
  }

  state = {
    clearBtnVisible: false,
    currentSearch: ''
  }

  componentDidMount() {
    this.focusSearch();
  }

  componentWillUpdate(nextProps, nextState) {
    const { currentSearch } = this.state;
    const { currentSearch: nextCurrentSearch } = nextState;

    if (currentSearch !== nextCurrentSearch) {
      this.setState({ clearBtnVisible: nextCurrentSearch.length !== 0 });
    }
  }

  clearSearch = () => this.searchInput.value = '';
  focusSearch = e => this.searchInput.focus();

  getClearBtn = () => (
    <div aria-label="Clear Search"
      className="search-clear"
      onKeyDown={this.onResetKeyDown}
      onMouseUp={this.clearSearch}
      role="button"
      tabIndex="0"
    >
      <div className="search-clear-cross" />
    </div>
  );

  onActionKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 32) this.searchImages();
  }

  onResetKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 32) this.clearSearch();
  }

  onTextInputChange = e => {
    this.setState({ currentSearch: this.searchInput.value });
  }

  onTextKeyInput = e => {
    if (e.keyCode === 13) this.searchImages();
  }

  searchImages = () => {
    const { history } = this.props;

    history.push({ pathname: '/results' });

    return;
  }

  render() {
    return (
      <div className="search">
        <div className="search-container"
          data-active="false"
          ref={ref => this.searchContainer = ref}
        >
          <input aria-label="Search Images"
            className="inline-input"
            name="image-search"
            onChange={this.onTextInputChange}
            onFocus={this.focusSearch}
            onKeyDown={this.onTextKeyInput}
            placeholder="Search stashy gifs"
            ref={ref => this.searchInput = ref}
            role="Search"
            type="text"
          />
          { this.state.clearBtnVisible ? this.getClearBtn() : null }
        </div>
        <div aria-label="Start Search"
          className="btn search-btn"
          onMouseUp={this.searchImages}
          onKeyDown={this.onActionKeyDown}
          ref={ref => this.searchBtn = ref}
          role="Buttton"
          tabIndex="0"
        >
          <span className="btn-text">Search</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));