import React from 'react';
import PersonDetails from '../src/app/components/PersonDetails';
import * as Store from '../src/app/components/Store';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import person from './mock-data/person';

jest.mock('../src/app/components/Store', () => {
  return ({
    getItemFromLocalStorage: jest.fn(() => { return  {}}),
    setItemInLocalStorage: jest.fn(() => true),
    fetchData: jest.fn(() => Promise.resolve({}).catch(error => console.log(error)))
  });
})

test('PersonDetails component renders', () => {
  const getItemFromLocalStorageSpy = jest.spyOn(Store, 'getItemFromLocalStorage');
  const fetchDataSpy = jest.spyOn(Store, 'fetchData');

  const wrapper = mount(
    <PersonDetails match={{"params": { "id": person.id }}}/>
  );

  expect(getItemFromLocalStorageSpy).toHaveBeenCalled();
  expect(fetchDataSpy).toHaveBeenCalled();
});

test('PersonDetails component renders with data', () => {
  const wrapper = mount(
    <PersonDetails match={{"params": { "id": person.id }}}/>
  );
  expect(wrapper.find('section h1').length).toBe(0);
  expect(wrapper.find('section img').length).toBe(0);

  wrapper.instance().setState(person);

  wrapper.update();

  expect(wrapper.state()).toEqual(person);
  expect(wrapper.find('section h1').length).toBe(1);
  expect(wrapper.find('section h1').text()).toBe("Marlon Brando");
  expect(wrapper.find('section img').length).toBe(1);
  expect(wrapper.find('section img').node.getAttribute('alt')).toBe("Image of Marlon Brando");
  expect(wrapper.find('section img').node.getAttribute('src')).toBe("https://image.tmdb.org/t/p/w500//e2u2Vyy66j2rUL8fyjjHWlYtWLH.jpg");
});


describe('PersonDetails component renders', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <PersonDetails match={{"params": { "id": person.id }}}/>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
