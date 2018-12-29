import { create } from 'react-test-renderer';
import App from '../components/App';
import Legal from '../components/Docs/Legal';
import React from 'react';
import ServerRouter, { withRouter } from 'react-router-dom';

test('snapshot', () => {
  const legalComponent = create(withRouter(<Legal />));

  expect(legalComponent.toJSON()).toMatchSnapshot();
});

