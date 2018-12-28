import { connect } from 'react-redux';
import { func, number, object, string } from 'prop-types';
import { setCurrentItem } from '../../actions/actionCreators';
import React, { Component } from 'react';

class Item extends Component {
  static propTypes = {
    currentItem: object,
    item: object,
    itemIndex: number,
    pageLength: number,
    revealPagingControl: func,
    setCurrentItem: func,
    toggleOverlay: func,
    type: string,
    winW: number
  }

  state = {
    isExpanding: '',
    isExpandingTimeout: ''
  }

  componentWillMount() {
    const { itemIndex } = this.props;
    let itemOffset = 75;
    let loadOffset = itemIndex * itemOffset;

    this.setState({
      isExpandingTimeout: setTimeout(() => this.expandItem(), loadOffset)
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      item: nextItem,
      currentItem: nextCurrentItem
    } = nextProps;

    const { item, setCurrentItem } = this.props;

    if (nextCurrentItem.id === nextItem.id && nextItem.id !== item.id) {
      setCurrentItem({ item: nextItem });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isExpanding, isExpandingTimeout } = this.state;

    if (isExpanding !== prevState.isExpanding) clearTimeout(isExpandingTimeout);
  }

  componentWillUnmount() {
    const { isExpandingTimeout } = this.state;

    clearTimeout(isExpandingTimeout);
  }

  expandItem = () => {
    const { itemIndex, pageLength, revealPagingControl } = this.props;

    this.setState({ isExpanding: 'expanding' });

    if (itemIndex === pageLength - 1) revealPagingControl();
  }

  launchOverlay = async e => {
    const { setCurrentItem, toggleOverlay, item } = this.props;

    e.stopPropagation();
    await setCurrentItem({ item });
    await toggleOverlay({
      data: {},
      name: 'image-item'
    });
  }

  render() {
    const { item: { id, title }, type, winW } = this.props;
    const { isExpanding } = this.state;

    return (
      <div className={`${type} list-item ${isExpanding}`}
        id={`list-item-${id}`}
      >
        <div className="list-item-container" onClick={this.launchOverlay}>
          <div className="list-item-img" />
        </div>
        <div className="list-item-title">
          <h5>{title}</h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentItem: state.currentItem ? state.currentItem : {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentItem(params) { dispatch(setCurrentItem(params)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
