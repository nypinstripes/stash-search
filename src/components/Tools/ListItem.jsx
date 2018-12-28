import { breakpoints } from '../Config';
import { connect } from 'react-redux';
import { func, number, object, string } from 'prop-types';
import { getFavorites, setCurrentItem, setFavoriteItem } from '../../actions/actionCreators';
import React, { Component } from 'react';
import SvgIcon from './SvgIcon';

class Item extends Component {
  static propTypes = {
    currentItem: object,
    favorites: object,
    getFavorites: func,
    item: object,
    itemIndex: number,
    pageLength: number,
    revealPagingControl: func,
    setCurrentItem: func,
    setFavoriteItem: func,
    toggleOverlay: func,
    type: string,
    winW: number
  }

  state = {
    isExpanding: '',
    isExpandingTimeout: '',
    isFavorite: false,
    itemActive: false
  }

  componentWillMount() {
    const { itemIndex, type } = this.props;
    let itemOffset = 75;
    let loadOffset = itemIndex * itemOffset;

    this.checkFavoriteStatus(this.props);

    this.setState({
      isExpandingTimeout: setTimeout(() => this.expandItem(), loadOffset)
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      favorites: nextFavorites,
      item: nextItem,
      currentItem: nextCurrentItem
    } = nextProps;

    const { item, setCurrentItem, type } = this.props;

    if (nextCurrentItem.id === nextItem.id && nextItem.id !== item.id) {
      setCurrentItem({ item: nextItem });
    }

    this.checkFavoriteStatus(nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    const { getFavorites, type } = this.props;
    const { isFavorite: nextIsFavorite } = nextState;
    const { isFavorite } = this.state;

    if (type === 'favorites' && nextIsFavorite !== isFavorite) {
      this.listItem.classList.remove('expanded');
      getFavorites();
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

  checkFavoriteStatus = props => {
    const { favorites, item: { id }} = props;

    if (favorites[id]) this.setState({ isFavorite: true });
  }

  expandItem = () => {
    const { itemIndex, pageLength, revealPagingControl } = this.props;

    this.setState({ isExpanding: 'expanded' });

    if (itemIndex === pageLength - 1) revealPagingControl();
  }

  getFavoriteTitle = () => {
    const { item: { title }} = this.props;
    const { isFavorite } = this.state;
    let direction = isFavorite ? 'from' : 'to';
    let verbiage = isFavorite ? 'Remove' : 'Add';

    return `${verbiage} ${title} ${direction} your favorites.`;
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
    const { item, setFavoriteItem } = this.props;
    const { isFavorite } = this.state;
    let action = isFavorite ? 'delete' : 'add';

    e.stopPropagation();
    this.setState({ isFavorite: !isFavorite });
    setFavoriteItem({ action, item });
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

    const { isExpanding, isFavorite, itemActive } = this.state;

    return (
      <div className={`${type} list-item ${isExpanding}`}
        id={`list-item-${id}`}
        onBlur={e => this.setState({ itemActive: false })}
        onClick={this.onItemAction}
        onFocus={e => this.setState({ itemActive: true })}
        onKeyDown={this.onActionKeyDown}
        onMouseEnter={this.toggleActive}
        onMouseLeave={this.toggleActive}
        ref={ref => this.listItem = ref}
        title={title}
        tabIndex="0"
      >
        <div className="list-item-container">
          <div className="list-item-img">
            { itemActive ? this.getItemVideo() : null }
            <div className="list-item-img-fg"
              style={{ backgroundImage: `url(${still})`}}
            />
          </div>
          <div className={`list-item-favorite${isFavorite ? ' active' : ''}`}
            onClick={this.toggleFavorite}
            onKeyDown={this.onActionKeyDownFavorite}
            role="Button"
            tabIndex="0"
            title={this.getFavoriteTitle()}
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
  currentItem: state.currentItem ? state.currentItem : {},
  favorites: state.favorites ? state.favorites : {},
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getFavorites() { dispatch(getFavorites()); },
  setCurrentItem(params) { dispatch(setCurrentItem(params)); },
  setFavoriteItem(params) { dispatch(setFavoriteItem(params)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
