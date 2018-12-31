import { bool, func, number } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { setFavorites, setScrollBarOffset } from '../actions/actionCreators';
import Favorites from './Favorites';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import keydown from 'react-keydown';
import Landing from './Landing';
import Legal from './Docs/Legal';
import NotFound from './Tools/NotFound';
import Overlay from './Overlays/Overlay';
import Privacy from './Docs/Privacy';
import ScrollTopBtn from './Tools/ScrollTopBtn';
import Search from './Search/Search';
import SearchResults from './Search/SearchResults';
import Terms from './Docs/Terms';
import React, { Component } from 'react';

class App extends Component {
  static propTypes = {
    scrollOffset: number,
    setFavorites: func,
    setScrollBarOffset: func
  }

  state = {
    overlayActive: false,
    overlayData: {},
    overlayLocked: false,
    overlayName: 'default',
    winW: 0
  }

  componentWillMount() {
    this.setupFavorites();
    this.setWindowWidth();
  }

  componentDidMount() {
    let offset = parseInt(document.body.getAttribute('data-offset'));

    this.props.setScrollBarOffset(offset);
    window.addEventListener('resize', this.setWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWindowWidth);
  }

  activateOverlay = () => {
    const {
      overlayActive,
      overlayData,
      overlayLocked,
      overlayName,
      winW
    } = this.state;

    if (overlayActive) {
      return <Overlay disposeOverlay={this.disposeOverlay}
        overlayActive={overlayActive}
        overlayData={overlayData}
        overlayLocked={overlayLocked}
        overlayName={overlayName}
        toggleOverlay={this.toggleOverlay}
        winW={winW}
      />;
    } else {
      return <Overlay disposeOverlay={this.disposeOverlay}
        overlayActive={false}
        overlayName="default"
        winW={winW}
      />;
    }
  }

  @keydown('esc')
  disposeOverlayKey(e) { this.disposeOverlay(e); }

  disposeOverlay = e => {
    if (e) e.stopPropagation();

    this.setState({ overlayActive: false });
    document.body.classList.remove('no-scroll');
  }

  getAppClasses = () => {
    const { overlayActive } = this.state;
    let activeOverlay = overlayActive ? ' overlay-active' : '';
    let offsetScroll = this.getScrollOffset();
    let pageName = this.getPageName();

    return `app ${pageName}${activeOverlay}${offsetScroll}`;
  }

  getPageName = () => {
    let path = location.pathname;

    if (path === '/') return 'landing';

    path = path.substring(1);

    if (path.indexOf('/') === -1) {
      return path;
    } else {
      let extension = '';

      return `${path.substring(0, path.indexOf('/'))}${extension}`;
    }
  }

  getScrollOffset = () => this.props.scrollOffset > 0 ? ' offset-scroll' : '';

  setupFavorites = () => {
    const { setFavorites } = this.props;

    if (!JSON.parse(localStorage.getItem('favorites'))) return setFavorites({ favorites: {} });
  }

  setWindowWidth = () => this.setState({ winW: window.innerWidth })

  toggleOverlay = options => {
    this.setState({
      overlayActive: true,
      overlayData: options.data,
      overlayLocked: options.locked || false,
      overlayName: options.name
    });

    document.body.classList.add('no-scroll');
  }

  render() {
    const { winW } = this.state;

    return (
      <div className={this.getAppClasses()}>
        { this.activateOverlay() }
        <Header />
        <ScrollTopBtn />
        <div className="app-body">
          <Search />
          <Switch>
            <Route exact path="/" render={props => <Landing {...props} />} />
            <Route path="/favorites"
              render={props => <Favorites
                toggleOverlay={this.toggleOverlay}
                winW={winW}
                {...props}
              />}
            />
            <Route path="/legal"
              render={props => <Legal {...props} />}
            />
            <Route path="/privacy"
              render={props => <Privacy {...props} />}
            />
            <Route path="/results"
              render={props => <SearchResults
                toggleOverlay={this.toggleOverlay}
                winW={winW}
                {...props}
              />}
            />
            <Route path="/terms" render={props => <Terms {...props} />} />
            <Route render={props => <NotFound {...props} />} />
          </Switch>
        </div>
        <Footer page={this.getPageName()} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  scrollOffset: state.scrollOffset ? state.scrollOffset : 0
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFavorites(params) { dispatch(setFavorites(params)); },
  setScrollBarOffset(params) { dispatch(setScrollBarOffset(params)); }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

