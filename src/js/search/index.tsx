import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SearchPage from './SearchPage';

interface InitSearchPage {
  posts: Array<Record<string, unknown>>;
  categories: Array<Record<string, unknown>>;
  tags: Array<Record<string, unknown>>;
  maxNumPages: number;
}

/* eslint-disable */
// use within PHP template to pass initial posts from PHP to React
export const initSearchPage = ({
  posts,
  categories,
  tags,
  maxNumPages
}: InitSearchPage) => {
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
};
