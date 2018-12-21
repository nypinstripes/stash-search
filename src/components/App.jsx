import { bool, func, number } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { setScrollBarOffset } from '../actions/actionCreators';
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
import Search from './Search';
import Terms from './Docs/Terms';
import React, { Component } from 'react';

class App extends Component {
  static propTypes = {
    loaderActive: bool,
    scrollOffset: number,
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
      return <Overlay overlayActive={false}
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
    let offsetScroll = this.getScrollOffset();
    let pageName = this.getPageName();
    let showLoader = `loader-${this.getLoaderActivity()}`;

    return `app ${showLoader}${pageName}${offsetScroll}`;
  }

  getLoaderActivity = () => this.props.loaderActive ? 'active' : 'inactive'

  getPageName = () => {
    let path = location.pathname;

    if (path === '/') return ' landing';

    path = path.substring(1);

    if (path.indexOf('/') === -1) {
      return ` ${path}`;
    } else {
      let extension = '';

      return ` ${path.substring(0, path.indexOf('/'))}${extension}`;
    }
  }

  getScrollOffset = () => this.props.scrollOffset > 0 ? ' offset-scroll' : '';
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
    return (
      <div className={this.getAppClasses()}>
        { this.activateOverlay() }
        <Header />
        <ScrollTopBtn />
        <div className="app-body">
          <Search />
          <Switch>
            <Route exact path="/" render={props => <Landing {...props} />} />
            <Route exact
              path="/favorites"
              render={props => <Favorites {...props} />}
            />
            <Route exact
              path="/legal"
              render={props => <Legal {...props} />}
            />
            <Route exact
              path="/privacy"
              render={props => <Privacy {...props} />}
            />
            <Route exact path="/terms" render={props => <Terms {...props} />} />
            <Route render={props => <NotFound {...props} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loaderActive: state.loaderActive ? state.loaderActive : false,
  scrollOffset: state.scrollOffset ? state.scrollOffset : 0
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setScrollBarOffset(params) { dispatch(setScrollBarOffset(params)); }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

