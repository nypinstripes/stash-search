import { create } from 'react-test-renderer';
import App from '../components/App';
import Header from '../components/Layout/Header';
import React from 'react';
import ServerRouter, { Link, withRouter } from 'react-router-dom';

test('snapshot', () => {
  const headerComponent = create(withRouter(<Header />));

  expect(headerComponent.toJSON()).toMatchSnapshot();
});
