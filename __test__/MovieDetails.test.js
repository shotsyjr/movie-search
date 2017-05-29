import React from 'react';
import MovieDetails from '../src/app/components/MovieDetails';
import * as Store from '../src/app/components/Store';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import movie from './mock-data/movie';

jest.mock('../src/app/components/Store', () => {
  return ({
    getItemFromLocalStorage: jest.fn(() => { return  {}}),
    setItemInLocalStorage: jest.fn(() => true),
    fetchData: jest.fn(() => Promise.resolve({}).catch(error => console.log(error)))
  });
})

test('MovieDetails component renders', () => {
  const getItemFromLocalStorageSpy = jest.spyOn(Store, 'getItemFromLocalStorage');
  const fetchDataSpy = jest.spyOn(Store, 'fetchData');

  const wrapper = mount(
    <MovieDetails match={{"params": { "id": movie.id }}}/>
  );

  expect(getItemFromLocalStorageSpy).toHaveBeenCalled();
  expect(fetchDataSpy).toHaveBeenCalled();
});

test('MovieDetails component renders with data', () => {
  const wrapper = mount(
    <MovieDetails match={{"params": { "id": movie.id }}}/>
  );
  expect(wrapper.find('section h1').length).toBe(0);
  expect(wrapper.find('section img').length).toBe(0);

  wrapper.instance().setState(movie);

  wrapper.update();

  expect(wrapper.state()).toEqual(movie);
  expect(wrapper.find('section h1').length).toBe(1);
  expect(wrapper.find('section h1').text()).toBe("On the Waterfront");
  expect(wrapper.find('section img').length).toBe(1);
  expect(wrapper.find('section img').node.getAttribute('alt')).toBe("Poster for On the Waterfront movie");
  expect(wrapper.find('section img').node.getAttribute('src')).toBe("https://image.tmdb.org/t/p/w500//2AKM5RxGoerG5v1x4TWu36MDxqT.jpg");
});


describe('MovieDetails component renders', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <MovieDetails match={{"params": { "id": movie.id }}}/>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
