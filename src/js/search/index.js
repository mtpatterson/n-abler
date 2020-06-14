import React from 'react';
import ReactDOM from 'react-dom';
import SearchPage from './SearchPage';

// use within PHP template to pass initial items from PHP to React
export function initSearchPage(searchResults) {
  const search = document.querySelector('.js-search-page');

  ReactDOM.render(<SearchPage searchResults={searchResults} />, search);
}
