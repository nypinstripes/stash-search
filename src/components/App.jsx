import { bool, func, number } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { setScrollBarOffset } from '../actions/actionCreators';
import Favorites from './Favorites';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import keydown from 'react-keydown';
import NotFound from './Tools/NotFound';
import Overlay from './Overlays/Overlay';
import ScrollTopBtn from './Tools/ScrollTopBtn';
import Search from './Search';
import Landing from './Landing';
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
    return `app loader-${this.getLoaderActivity()}${this.getScrollOffset()}`;
  }

  getLoaderActivity = () => this.props.loaderActive ? 'active' : 'inactive'
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
          <Switch>
            <Route exact path="/" render={props => <Landing {...props} />} />
            <Route exact
              path="/favorites"
              render={props => <Favorites {...props} />}
            />
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

