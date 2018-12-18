import React from 'react';
import { create } from 'react-test-renderer';
import Landing from '../components/Landing';

test('snapshot', () => {
  const landingComponent = create(<Landing />);

  expect(landingComponent.toJSON()).toMatchSnapshot();
});
