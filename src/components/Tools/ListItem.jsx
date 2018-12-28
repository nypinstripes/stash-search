import { breakpoints } from '../Config';
import { connect } from 'react-redux';
import { func, number, object, string } from 'prop-types';
import { setCurrentItem } from '../../actions/actionCreators';
import React, { Component } from 'react';
import SvgIcon from './SvgIcon';

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
    isExpandingTimeout: '',
    itemActive: false
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

  getItemVideo = () => {
    const {
      item: {
        images: {
          '480w_still': { url: still },
          looping: { mp4: clip }
        },
      }
    } = this.props;

    return (
      <div className="list-item-img-bg">
        <video src={clip}
          autoPlay={true}
          controls={false}
          loop={true}
          muted={true}
          playsInline={true}
          poster={still}
        />
      </div>
    );
  }

  launchOverlay = async e => {
    const { setCurrentItem, toggleOverlay, item } = this.props;

    e.stopPropagation();
    await setCurrentItem({ item });
    await toggleOverlay({
      data: {},
      name: 'item-image'
    });
  }

  onActionKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 32) this.onItemAction(e);

    return;
  }

  onActionKeyDownFavorite = e => {
    if (e.keyCode === 13 || e.keyCode === 32) this.toggleFavorite(e);
  }

  onItemAction = e => {
    const { winW } = this.props;
    const { large: largeItem } = breakpoints;

    e.stopPropagation();

    if (winW >= largeItem) return this.launchOverlay(e);
  }

  toggleActive = e => {
    const { itemActive } = this.state;

    e.stopPropagation();

    this.setState({ itemActive: !itemActive });
  }

  toggleFavorite = e => {
    e.stopPropagation();

    return;
  }

  render() {
    const {
      item: {
        id,
        images: {
          '480w_still': { url: still }
        },
        title
      },
      type,
      winW
    } = this.props;

    const { isExpanding, itemActive } = this.state;

    return (
      <div className={`${type} list-item ${isExpanding}`}
        id={`list-item-${id}`}
        onBlur={this.toggleActive}
        onClick={this.onItemAction}
        onFocus={this.toggleActive}
        onKeyDown={this.onActionKeyDown}
        title={title}
        tabIndex="0"
      >
        <div className="list-item-container"
          onMouseEnter={this.toggleActive}
          onMouseLeave={this.toggleActive}
        >
          <div className="list-item-img">
            { itemActive ? this.getItemVideo() : null }
            <div className="list-item-img-fg"
              style={{ backgroundImage: `url(${still})`}}
            />
          </div>
          <div className="list-item-favorite"
            onClick={this.toggleFavorite}
            onKeyDown={this.onActionKeyDownFavorite}
            role="Button"
            tabIndex="0"
            title={`Add ${title} to your favorites`}
          >
            <div className="list-item-favorite-container">
              <SvgIcon name="favorite" />
            </div>
          </div>
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
