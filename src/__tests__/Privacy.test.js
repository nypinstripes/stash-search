import { create } from 'react-test-renderer';
import App from '../components/App';
import Privacy from '../components/Docs/Privacy';
import React from 'react';
import ServerRouter, { withRouter } from 'react-router-dom';

test('snapshot', () => {
  const privacyComponent = create(withRouter(<Privacy />));

  expect(privacyComponent.toJSON()).toMatchSnapshot();
});
