import { Route, Switch, withRouter } from 'react-router-dom';
import Favorites from './Favorites';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import NotFound from './Tools/NotFound';
import Overlay from './Overlays/Overlay';
import ScrollTopBtn from './Tools/ScrollTopBtn';
import Search from './Search';
import Landing from './Landing';
import React, { Component } from 'react';

const App = () => (
  <div className="app">
    <Overlay />
    <Header />
    <ScrollTopBtn />
    <div className="app-body">
      <Switch>
        <Route exact path="/" render={props => <Landing {...props} />} />
        <Route exact path="/favorites" render={props => <Favorites {...props} />} />
        <Route render={props => <NotFound {...props} />} />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default withRouter(App);
