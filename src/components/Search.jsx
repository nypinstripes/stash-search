import { connect } from 'react-redux';
import { uniqKey } from '../utils/helperUtils';
import React, { Component } from 'react';

class Search extends Component {
  state = {
    clearBtnVisible: false
  }

  componentDidMount() {
    this.focusSearch();
  }

  blurSearch = e => {
    return ;
  }

  focusSearch = e => this.searchInput.focus();

  getClearBtn = () => (
    <div aria-label="Clear Search"
      className="search-clear"
      onBlur={this.blurSearch}
      onFocus={this.focusSearch}
      onKeyDown={this.onActionKeyDown}
      onMouseUp={this.searchImages}
      role="button"
      tabIndex="0"
    />
  );

  onActionKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 32) this.searchInput.blur();
  }

  onTextKeyInput = e => {
    if (e.keyCode === 13) {
      e.stopPropagation();
    } else {
      this.setState({ clearBtnVisible: this.searchInput.value.length > 0 });
    }
  }

  searchImages = () => {
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
            onBlur={this.blurSearch}
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
