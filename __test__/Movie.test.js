import React from 'react';
import Movie from '../src/app/components/Movie';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const mockData = {
  id: 1,
  title: "On The Waterfront",
  release_date: "1954-06-22"
}
test('Movie component renders', () => {
  const wrapper = mount(
      <Movie {...mockData}/>
  );

  expect(wrapper.find('.movie-list__item').length).toBe(1);
  expect(wrapper.find('.movie-list__item').text()).toBe("On The Waterfront - Release date: 1954-06-22");
});

describe('Movie component renders', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
        <Movie {...mockData}/>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
