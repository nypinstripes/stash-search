import { connect } from 'react-redux';
import { uniqGenerator } from '../utils/helperUtils';
import React, { Component } from 'react';

class Search extends Component {
  static propTypes = {

  }

  state = { clearBtnVisible: false }

  blurSearch = e => {
    return ;
  }

  focusSearch = e => {
    return ;
  }

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
  )

  onActionKeyDown = e => {
    // if (e.keyCode === 13 || e.keyCode === 32) {
    //  ReactDOM.findDOMNode(this.refs['settingsFormSave']).blur();
    // }
  }

  // onTextInput = e => { if (e.keyCode === 13) this.updateAuthorDetails(); }

  searchImages = () => {
    return;
  }

  render() {
    const { clearBtnVisible, selectedSort } = this.state;

    return [
      <div className="search-container"
        data-active="false"
        key={uniqGenerator()}
        ref={ref => this.searchContainer = ref}
      >
        <input aria-label="Search Images"
          name="image-search"
          onBlur={this.blurSearch}
          onFocus={this.focusSearch}
          onKeyDown={this.onTextInput}
          placeholder="Search gifs"
          ref={ref => this.searchInput = ref}
          role="Search"
          type="text"
        />
        { clearBtnVisible ? this.getClearBtn() : null }
      </div>,
      <div aria-label="Start Search"
        className="btn search-btn"
        key={uniqGenerator()}
        role="Buttton"
        tabIndex="0"
      >
        <span className="btn-text">Search</span>
      </div>
    ];
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
