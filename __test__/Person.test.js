import React from 'react';
import Person from '../src/app/components/Person';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const mockData = {
  id: 12,
  name: "Marlon Brando"
}
test('Person component renders', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Person {...mockData}/>
    </MemoryRouter>
  );

  expect(wrapper.find('.person-list__item__link').length).toBe(1);
  expect(wrapper.find('.person-list__item__link').text()).toBe("Marlon Brando");
  expect(wrapper.find('.person-list__item__link').node.getAttribute('href')).toEqual('/person/details/12')
});

describe('Person component renders', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <MemoryRouter>
        <Person {...mockData}/>
      </MemoryRouter>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
