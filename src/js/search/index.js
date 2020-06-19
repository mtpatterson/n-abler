import React from 'react';
import ReactDOM from 'react-dom';
import SearchPage from './SearchPage';

// use within PHP template to pass initial posts from PHP to React
export function initSearchPage({ posts, categories, tags, maxNumPages }) {
  const search = document.querySelector('.js-search-page');

  ReactDOM.render(
    <SearchPage
      initialPosts={posts}
      categories={categories}
      tags={tags}
      maxNumPages={maxNumPages}
    />,
    search
  );
}
