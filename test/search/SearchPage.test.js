import React from 'react';
import { render } from '@testing-library/react';
import SearchPage from '@frontend/search/SearchPage';
import { posts, categories, tags } from './data';

describe('<SearchPage />', () => {
  test('search page', () => {
    const wrapper = render(
      <SearchPage
        initialPosts={posts}
        maxNumPages={1}
        categories={categories}
        tags={tags}
      />
    );

    console.log(wrapper);
  });
});
