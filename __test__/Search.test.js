import React from 'react';
import Search from '../src/app/components/Search';
import * as Store from '../src/app/components/Store';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import movies from './mock-data/movies';

let mockData = {
  results: movies.results,
  resultsType: "movie",
  userSearch: false
}
// suppressing Link
jest.mock('react-router-dom');

jest.mock('../src/app/components/Store', () => {
  return ({
    getItemFromLocalStorage: jest.fn(() => { return  {}}),
    setItemInLocalStorage: jest.fn(() => true),
    fetchData: jest.fn(() => Promise.resolve({}).catch(error => console.log(error)))
  });
})

test('Search component renders', () => {
  const getItemFromLocalStorageSpy = jest.spyOn(Store, 'getItemFromLocalStorage');
  const fetchDataSpy = jest.spyOn(Store, 'fetchData');
  const queryMock = jest.spyOn(Search.prototype, "queryMovieDB");

  const wrapper = mount(
    <Search />
  );

  expect(getItemFromLocalStorageSpy).toHaveBeenCalled();
  expect(queryMock).toHaveBeenCalled();
  expect(fetchDataSpy).toHaveBeenCalled();
});

test('Search component renders with results', () => {
  const wrapper = mount(
    <Search />
  );
  expect(wrapper.find('.movie-list__item').length).toBe(0);

  wrapper.instance().setState(mockData);

  wrapper.update();

  expect(wrapper.state()).toEqual(mockData);
  expect(wrapper.find('.movie-list__item').length).toBe(20);
});


describe('Search component renders', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Search />
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
