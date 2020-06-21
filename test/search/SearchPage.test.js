import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SearchPage from '@frontend/search/SearchPage';
import { fetchFilteredPosts as mockFetchFilteredPosts } from '@frontend/services';

import { posts, categories, tags } from './data';

jest.mock('@frontend/services');

delete global.window.location;
global.window = Object.create(window);
global.window.location = {
  search: '?s=test',
  protocol: 'http:',
  hostname: 'localhost'
};

const setup = () => {
  const utils = render(
    <SearchPage
      initialPosts={[posts[1]]}
      categories={categories}
      tags={tags}
      maxNumPages={1}
    />
  );

  const input = screen.getByRole('textbox');
  const postsContainer = screen.getByTestId('search-page-posts');

  return {
    input,
    postsContainer,
    ...utils
  };
};

test('loads posts based on query param', () => {
  const { input } = setup();

  expect(input.value).toEqual('test');
});

test('loads posts when input value changes', async () => {
  const { input, postsContainer, debug } = setup();

  mockFetchFilteredPosts.mockResolvedValueOnce({
    newPosts: posts,
    newPages: 1
  });

  expect(postsContainer.children.length).toEqual(1);

  fireEvent.change(input, {
    target: { value: '' }
  });

  expect(mockFetchFilteredPosts).toHaveBeenCalledTimes(1);

  await waitFor(() => {
    expect(postsContainer.children.length).toEqual(10);
  });
});
