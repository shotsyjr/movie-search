import React from 'react';
import Movie from '../src/app/components/Movie';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const mockData = {
  id: 1,
  title: "On The Waterfront",
  release_date: "1954-06-22"
}
test('Movie component renders', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Movie {...mockData}/>
    </MemoryRouter>
  );

  expect(wrapper.find('.movie-list__item__link').length).toBe(1);
  expect(wrapper.find('.movie-list__item__link').text()).toBe("On The Waterfront - Release date: 1954-06-22");
  expect(wrapper.find('.movie-list__item__link').node.getAttribute('href')).toEqual('/movie/details/1')
});

describe('Movie component renders', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <MemoryRouter>
        <Movie {...mockData}/>
      </MemoryRouter>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
