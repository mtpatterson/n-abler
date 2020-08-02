import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Category, Post, Tag } from '../types';
import SearchPage from './SearchPage';

interface InitSearchPageProps {
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  maxNumPages: string;
}

// use within PHP template to pass initial posts from PHP to React
export function initSearchPage({
  posts,
  categories,
  tags,
  maxNumPages
}: InitSearchPageProps): void {
  const search = document.querySelector('.js-search-page');

  ReactDOM.render(
    <SearchPage
      initialPosts={posts}
      categories={categories}
      tags={tags}
      maxNumPages={Number(maxNumPages)}
    />,
    search
  );
}
