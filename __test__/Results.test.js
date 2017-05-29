import React from 'react';
import Results from '../src/app/components/Results';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import people from './mock-data/people';
import movies from './mock-data/movies';

let peopleResults = people.results;
let movieResults = movies.results;

// supressing Link
jest.mock('react-router-dom');

test('Results component renders for movies - no results', () => {
  let testData = {
    results: [],
    resultsType: "movie"
  }
  const wrapper = mount(
    <Results {...testData} />
  );
  expect(wrapper.text()).toBe("No movies found.");
});
test('Results component renders for people - no results', () => {
  let testData = {
    results: [],
    resultsType: "people"
  }
  const wrapper = mount(
    <Results {...testData} />
  );
  expect(wrapper.text()).toBe("No people found.");
});

describe('Results component renders for movies - no results', () => {
  it('renders correctly', () => {
    let testData = {
      results: [],
      resultsType: "movie"
    }
    const rendered = renderer.create(
      <Results {...testData} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});


describe('Results component renders for people - no results', () => {
  it('renders correctly', () => {
    let testData = {
      results: [],
      resultsType: "people"
    }
    const rendered = renderer.create(
      <Results {...testData} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});


test('Results component renders for movies - with results', () => {
  let testData = {
    userSearch: true,
    results: movieResults,
    resultsType: "movie"
  }
  const wrapper = mount(
    <Results {...testData} />
  );
  expect(wrapper.find(".search-title").text()).toBe("Lastest Search");
  expect(wrapper.find('.movie-list__item').length).toBe(20);
});
test('Results component renders for people - with results', () => {
  let testData = {
    userSearch: true,
    results: peopleResults,
    resultsType: "people"
  }
  const wrapper = mount(
    <Results {...testData} />
  );
  expect(wrapper.find(".search-title").text()).toBe("Lastest Search");
  expect(wrapper.find('.person-list__item').length).toBe(17);
});

test('Results component renders - none user search', () => {
  let testData = {
    userSearch: false,
    results: movieResults,
    resultsType: "movie"
  }
  const wrapper = mount(
    <Results {...testData} />
  );
  expect(wrapper.find(".search-title").text()).toBe("Recent Movie Releases");
});

describe('Results component renders for movies - with results', () => {
  it('renders correctly', () => {
    let testData = {
      userSearch: true,
      results: movieResults,
      resultsType: "movie"
    }
    const rendered = renderer.create(
      <Results {...testData} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});


describe('Results component renders for people - with results', () => {
  it('renders correctly', () => {
    let testData = {
      userSearch: true,
      results: peopleResults,
      resultsType: "people"
    }
    const rendered = renderer.create(
      <Results {...testData} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});

describe('Results component renders - none user search', () => {
  it('renders correctly', () => {
    let testData = {
      userSearch: false,
      results: movieResults,
      resultsType: "movie"
    }
    const rendered = renderer.create(
      <Results {...testData} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
