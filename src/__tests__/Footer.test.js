import { create } from 'react-test-renderer';
import App from '../components/App';
import Footer from '../components/Layout/Footer';
import React from 'react';
import ServerRouter, { Link, withRouter } from 'react-router-dom';

test('snapshot', () => {
  const footerComponent = create(withRouter(<Footer />));

  expect(footerComponent.toJSON()).toMatchSnapshot();
});
