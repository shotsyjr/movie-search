import React from 'react';
import Person from '../src/app/components/Person';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const mockData = {
  id: 12,
  name: "Marlon Brando"
}
test('Person component renders', () => {
  const wrapper = mount(
      <Person {...mockData}/>
  );

  expect(wrapper.find('.person-list__item').length).toBe(1);
  expect(wrapper.find('.person-list__item').text()).toBe("Marlon Brando");
});

describe('Person component renders', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
        <Person {...mockData}/>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
