import React from 'react';
import ReactDOM from 'react-dom';
import SearchPage from './SearchPage';

// use within PHP template to pass initial items from PHP to React
export function initSearchPage(initialPosts, maxNumPages) {
  const search = document.querySelector('.js-search-page');

  ReactDOM.render(
    <SearchPage initialPosts={initialPosts} maxNumPages={maxNumPages} />,
    search
  );
}
