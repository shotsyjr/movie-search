import React from 'react';
import MovieCredits from '../src/app/components/MovieCredits';
import * as Store from '../src/app/components/Store';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import credits from './mock-data/movieCredits';

// suppressing Link
jest.mock('react-router-dom');

jest.mock('../src/app/components/Store', () => {
  return ({
    getItemFromLocalStorage: jest.fn(() => { return  {}}),
    setItemInLocalStorage: jest.fn(() => true),
    fetchData: jest.fn(() => Promise.resolve({}).catch(error => console.log(error)))
  });
})

test('MovieCredits component renders', () => {
  const getItemFromLocalStorageSpy = jest.spyOn(Store, 'getItemFromLocalStorage');
  const fetchDataSpy = jest.spyOn(Store, 'fetchData');

  const wrapper = mount(
    <MovieCredits match={{"params": { "id": 1 }}}/>
  );

  expect(getItemFromLocalStorageSpy).toHaveBeenCalled();
  expect(fetchDataSpy).toHaveBeenCalled();
});

test('MovieCredits component renders with data', () => {
  const wrapper = mount(
    <MovieCredits match={{"params": { "id": 1 }}}/>
  );
  expect(wrapper.find('section h1').length).toBe(0);

  wrapper.instance().setState(credits);

  wrapper.update();

  expect(wrapper.state()).toEqual(credits);
  expect(wrapper.find('section h1').length).toBe(1);
  expect(wrapper.find('section h1').text()).toBe("Movie credits");
  expect(wrapper.find('section h2').length).toBe(2);
  expect(wrapper.find('section h2').at(0).text()).toBe("Cast");
  expect(wrapper.find('section h2').at(1).text()).toBe("Crew Members");
  expect(wrapper.find('.cast-list li').length).toBe(22);
  expect(wrapper.find('.crew-list li').length).toBe(11);
});


describe('PersonDetails component renders', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <MovieCredits match={{"params": { "id": 1 }}}/>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
