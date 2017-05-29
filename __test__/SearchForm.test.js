import React from 'react';
import SearchForm from '../src/app/components/SearchForm';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const onSubmit = jest.fn();
let inputElement, selectElement;

test('SearchForm component renders', () => {
  const wrapper = mount(
    <SearchForm submit={onSubmit}
      inputRef={el => inputElement = el}
      selectRef={el => selectElement = el}
    />
  );

  expect(wrapper.find('[name="search-form"]').length).toBe(1);
  expect(wrapper.find('[name="search-form"]').text()).toBe("Enter your search query:Enter your search type:MoviesPeople");
});

test('SearchForm submit', () => {

  const wrapper = mount(
    <SearchForm submit={onSubmit}
      inputRef={el => inputElement = el}
      selectRef={el => selectElement = el}
    />
  );
  let button= wrapper.find('[name="search-form"]');
  button.simulate('submit');

  expect(onSubmit).toHaveBeenCalled();
});

test('SearchForm change input values', () => {
  const wrapper = mount(
    <SearchForm submit={onSubmit}
      inputRef={el => inputElement = el}
      selectRef={el => selectElement = el}
    />
  );
  let input = wrapper.find('[name="query"]');
  let select = wrapper.find('[name="type"]');
  expect(input.node.value).toBe("");
  expect(select.node.value).toBe("movie");
  input.node.value = 'Tom Hanks';
  select.node.selectedIndex  = 1;
  input.simulate('change', input);
  select.simulate('change', select);
  expect(input.node.value).toBe('Tom Hanks');
  expect(select.node.value).toBe('person');
});

describe('SearchForm component renders', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <SearchForm submit={onSubmit}
        inputRef={el => inputElement = el}
        selectRef={el => selectElement = el}
      />
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
