import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchPage from '@frontend/search/SearchPage';
import { posts, categories, tags } from './data';

describe('<SearchPage />', () => {
  test('search page', () => {
    render(
      <SearchPage
        initialPosts={posts}
        categories={categories}
        tags={tags}
        maxNumPages={1}
      />
    );

    const input = screen.getByRole('textbox');

    input.value = 'test';

    console.log(input.value);
  });
});
