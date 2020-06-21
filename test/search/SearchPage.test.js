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
  const firstTermButtons = screen.getAllByTestId('term-category-item');

  return {
    input,
    postsContainer,
    categoryButton: firstTermButtons[0],
    tagButton: firstTermButtons[1],
    ...utils
  };
};

test('load posts based on query param', () => {
  const { input } = setup();

  expect(input.value).toEqual('test');
});

test('loads posts when input value changes', async () => {
  const { input, postsContainer } = setup();

  mockFetchFilteredPosts.mockResolvedValueOnce({
    newPosts: posts,
    newPages: 1
  });

  fireEvent.change(input, {
    target: { value: '' }
  });

  await waitFor(() => {
    expect(mockFetchFilteredPosts).toHaveBeenCalledWith('', {
      categories: [],
      tags: []
    });
    expect(postsContainer.children.length).toEqual(10);
    expect(mockFetchFilteredPosts).toHaveBeenCalledTimes(1);
  });
});

test('loads posts based on filter by category and then search', async () => {
  const { input, postsContainer, categoryButton } = setup();
  const searchValue = 'n-abler';

  const postsByCategory = posts.filter(
    post => post._embedded['wp:term'][0][0].term_id === 8
  );

  const postsByTitleAndCategory = postsByCategory.filter(post =>
    post.title.rendered.toLowerCase().includes(searchValue)
  );

  mockFetchFilteredPosts.mockResolvedValueOnce({
    newPosts: postsByCategory,
    newPages: 1
  });

  fireEvent.click(categoryButton);

  mockFetchFilteredPosts.mockResolvedValueOnce({
    newPosts: postsByTitleAndCategory,
    newPages: 1
  });

  fireEvent.change(input, {
    target: {
      value: searchValue
    }
  });

  await waitFor(() => {
    expect(postsContainer.children.length).toEqual(2);
    expect(mockFetchFilteredPosts).toHaveBeenCalledTimes(3);
  });
});
