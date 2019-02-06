import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import {
  getFavorites,
  setCurrentItem,
  setFavoriteItem
} from '../../actions/actionCreators';

import { Link, withRouter } from 'react-router-dom';
import hdate from 'human-date';
import React, { Component } from 'react';
import SvgSymbol from '../Tools/SvgSymbol';

class ItemImageOverlay extends Component {
  static propTypes = {
    currentItem: object,
    getFavorites: func,
    favorites: object, // eslint-disable-line react/no-unused-prop-types
    overlayData: object,
    setCurrentItem: func,
    setFavoriteItem: func
  }

  state = {
    isFavorite: false
  }

  componentWillMount() {
    const { overlayData: { isFavorite }} = this.props;

    if (isFavorite) {
      this.setState({ isFavorite });
    } else {
      this.checkFavoriteStatus(this.props);
    }
  }

  componentDidMount() {
    this.itemTitleEl.focus();
  }

  componentWillReceiveProps(nextProps) {
    this.checkFavoriteStatus(nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    const { getFavorites, overlayData: { type }} = this.props;
    const { isFavorite: nextIsFavorite } = nextState;
    const { isFavorite } = this.state;

    if (type === 'favorites' && nextIsFavorite !== isFavorite) {
      getFavorites();
    }
  }

  componentWillUnmount() {
    this.props.setCurrentItem({});
  }

  checkFavoriteStatus = props => {
    const { favorites, currentItem: { item: { id } }} = props;

    if (favorites[id]) this.setState({ isFavorite: true });
  }

  getItemAttributions = hasUser => {
    const {
      currentItem: {
        item,
        item: { import_datetime: posted }
      }
    } = this.props;

    return (
      <div className="overlay-info-attribution">
        { hasUser ?
          <span>
            <span>by </span>
            <a href={item.user.profile_url}
              rel="noopener noreferrer"
              role="Link"
              tabIndex="0"
              target="_blank"
              title={`${item.user.display_name}'s profile`}
            >
              {item.user.display_name}
            </a>
          </span>
          :
          null
        }
        <span>
          {hasUser ? ' ' : ''}on {hdate.prettyPrint(posted, { showTime: true })}
        </span>
      </div>
    );
  }

  getItemAvatar = () => {
    const {
      currentItem: {
        item: {
          user: {
            avatar_url: avatar,
            display_name: user,
            profile_url: profile
          }
        }
      }
    } = this.props;

    return (
      <a className="overlay-avatar"
        href={profile}
        rel="noopener noreferrer"
        role="Link"
        style={{ backgroundImage: `url(${avatar})` }}
        tabIndex="0"
        target="_blank"
        title={`${user}'s profile`}
      />
    );
  }

  getItemFavorite = () => {
    const { isFavorite } = this.state;

    return (
      <div className={`list-item-favorite${isFavorite ? ' active' : ''}`}
        onClick={this.toggleFavorite}
        onKeyDown={this.onActionKeyDownFavorite}
        ref={ref => this.favoriteEl = ref}
        role="Button"
        tabIndex="0"
        title={this.getFavoriteTitle()}
      >
        <div className="list-item-favorite-container">
          <SvgSymbol symbolId="#icon-favorite" />
        </div>
      </div>
    );
  }

  getItemMedia = () => {
    const {
      currentItem: {
        item: {
          images: {
            '480w_still': { url: still },
            looping: { mp4: clip }
          }
        }
      }
    } = this.props;

    return (
      <div className="overlay-content-body">
        <div className="overlay-content-body-content">
          <div className="overlay-content-body-container"
            onClick={e => e.stopPropagation()}
          >
            <video src={clip}
              autoPlay={true}
              controls={false}
              loop={true}
              muted={true}
              playsInline={true}
              poster={still}
            />
          </div>
        </div>
      </div>
    );
  }

  getItemRating = () => {
    const { currentItem: { item: { rating }}} = this.props;
    return (
      <div className="form-row">
        <div className="field-label" id="item-rating">Rated:</div>
        <div aria-labelledby="item-rating"
          className="field-value"
          data-rating={rating}
        >
          {rating.toUpperCase()}
        </div>
      </div>
    );
  }

  getItemTags = () => {
    const { currentItem: { item: { id, slug }}} = this.props;
    let slugIdIndex = slug.indexOf(`-${id}`);
    let sanitizedSlug = slug.substring(0, slugIdIndex);
    let tags = sanitizedSlug.split('-');

    if (tags.length < 1 || (tags.length === 1 && tags[0] === '')) return;

    return (
      <div className="form-row">
        <div className="field-label" id="item-tags">Tagged:</div>
        <div aria-labelledby="item-tags" className="field-value">
          {tags.map((tag, i) => {
            if (tag !== '') {
              return [
                <Link key={`${id}-${i}`}
                  title={`Search GIFs tagged ${tag}`}
                  to={`/results?query=${tag}`}
                >
                  {tag}
                </Link>,
                <span key={`${id}+${i}`}>{i < tags.length - 1 ? ',' : ''}</span>
              ];
            }
          })}
        </div>
      </div>
    );
  }

  getFavoriteTitle = () => {
    const { currentItem: { item: { title }}} = this.props;
    const { isFavorite } = this.state;
    let direction = isFavorite ? 'from' : 'to';
    let verbiage = isFavorite ? 'Remove' : 'Add';

    return `${verbiage} ${title} ${direction} your favorites.`;
  }

  onActionKeyDownFavorite = e => {
    if (e.keyCode === 13 || e.keyCode === 32) this.toggleFavorite(e);
  }

  toggleFavorite = e => {
    const { currentItem: { item }, setFavoriteItem } = this.props;
    const { isFavorite } = this.state;
    let action = isFavorite ? 'delete' : 'add';

    e.stopPropagation();
    this.setState({ isFavorite: !isFavorite });
    this.favoriteEl.blur();
    setFavoriteItem({ action, item });
  }

  render() {
    const { currentItem: { item, item: { title }}} = this.props;
    let hasUser = item.user && Object.keys(item.user).length > 0;
    let detailsClass = `overlay-details${!hasUser ? ' user-none' : ''}`;

    return (
      <div aria-live="polite" className="overlay-content">
        { this.getItemFavorite() }
        { this.getItemMedia() }
        <div aria-details
          className={detailsClass}
          onClick={e => e.stopPropagation()}
        >
          <div className="overlay-details-container">
            { hasUser ? this.getItemAvatar() : null }
            <div className="overlay-info">
              <h3 ref={ref => this.itemTitleEl = ref}
                role="Heading"
                title={title}
                tabIndex="0"
              >
                {title}
              </h3>
              { this.getItemAttributions(hasUser) }
              { this.getItemTags() }
              { this.getItemRating() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentItem: state.currentItem ? state.currentItem : {},
  favorites: state.favorites ? state.favorites : {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getFavorites() { dispatch(getFavorites()); },
  setCurrentItem(params) { dispatch(setCurrentItem(params)); },
  setFavoriteItem(params) { dispatch(setFavoriteItem(params)); }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ItemImageOverlay)
);
