import { create } from 'react-test-renderer';
import App from '../components/App';
import Favorites from '../components/Favorites';
import React from 'react';
import ServerRouter, { withRouter } from 'react-router-dom';

test('snapshot', () => {
  const favoritesComponent = create(withRouter(<Favorites />));

  expect(favoritesComponent.toJSON()).toMatchSnapshot();
});
