import { create } from 'react-test-renderer';
import App from '../components/App';
import React from 'react';
import ServerRouter, { withRouter } from 'react-router-dom';
import Terms from '../components/Docs/Terms';

test('snapshot', () => {
  const termsComponent = create(withRouter(<Terms />));

  expect(termsComponent.toJSON()).toMatchSnapshot();
});
