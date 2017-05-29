import React from 'react';
import Loader from '../src/app/components/Loader';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

test('Loader component renders', () => {
  const wrapper = mount(
    <Loader />
  );
  expect(wrapper.find('.loader').length).toBe(1);
});

describe('Loader component renders', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Loader />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
