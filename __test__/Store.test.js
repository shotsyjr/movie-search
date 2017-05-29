import React from 'react';
import {getItemFromLocalStorage, setItemInLocalStorage, fetchData} from '../src/app/components/Store';

const getItemMock = jest.fn(() => null);
const setItemMock = jest.fn();

var localStorageMock = () => {
    return {
        getItem: getItemMock,
        setItem: setItemMock
    };
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock()
});
const fetchDataMock = new Object({
  "status": 200,
  "statusText": "OK",
  "type": "cors"
});
window.fetch = jest.fn(() => Promise.resolve({}));

test('Store getItemFromLocalStorage calls localStorage', () => {
  getItemFromLocalStorage("item");
  expect(getItemMock).toBeCalledWith("item");
});

test('Store setItemInLocalStorage calls localStorage', () => {
  setItemInLocalStorage("item", {});
  expect(setItemMock).toBeCalledWith("item", "{}");
});

test('Store fetchData calls fetch', () => {
  fetchData("/");
  expect(fetch).toBeCalledWith("/");
});
