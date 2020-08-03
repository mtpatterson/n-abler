import debounce from 'lodash/debounce';
import uniqBy from 'lodash/uniqBy';
import { FilteredBy, NewPostsAndCount, Post } from '../types';

// WordPress default is 10
const PER_PAGE = '10';

export async function fetchPosts(
  query: string,
  params: string
): Promise<NewPostsAndCount> {
  try {
    // use try block to test if the request is sucessful
    const res = await fetch(
      `/wp-json/wp/v2/posts?per_page=${PER_PAGE}&search=${query}${params}`
    );

    const newPosts = await res.json();
    const newPages = res.headers.get('x-wp-totalpages');

    return {
      newPosts,
      newPages: Number(newPages)
    };
  } catch (err) {
    console.log(err);
  }
}

export function debounceFetchPosts(
  query: string,
  params = ''
): Promise<NewPostsAndCount> {
  return debounce(() => fetchPosts(query, params), 500, {
    leading: true
  })();
}

export async function fetchFilteredPosts(
  query: string,
  filteredBy: FilteredBy,
  pageParam = '',
  scrollingType = ''
): Promise<{
  newPosts: Post[];
  newPages: number;
  newPagesCats: number;
  newPagesTags: number;
  currentPage: number;
}> {
  let newByCategory = {
    newPosts: [],
    newPages: 0
  };

  let newByTag = {
    newPosts: [],
    newPages: 0
  };

  if (scrollingType) {
    if (scrollingType === 'cats') {
      // only make request for categories if filtering by category
      newByCategory = await fetchPosts(
        query,
        `&_embed&categories=${filteredBy.categories}${pageParam}`
      );
    }

    // only make request for tags if filtering by tag
    if (scrollingType === 'tags') {
      newByTag = await fetchPosts(
        query,
        `&_embed&tags=${filteredBy.tags}${pageParam}`
      );
    }
  } else {
    if (filteredBy.categories.length > 0) {
      // only make request for categories if filtering by category
      newByCategory = await fetchPosts(
        query,
        `&_embed&categories=${filteredBy.categories}${pageParam}`
      );
    }

    // only make request for tags if filtering by tag
    if (filteredBy.tags.length > 0) {
      newByTag = await fetchPosts(
        query,
        `&_embed&tags=${filteredBy.tags}${pageParam}`
      );
    }
  }

  const allFiltersRemoved =
    filteredBy.categories.length === 0 && filteredBy.tags.length === 0;

  if (allFiltersRemoved) {
    const { newPosts, newPages } = await fetchPosts(
      query,
      `&_embed${pageParam}`
    );

    return {
      newPosts,
      newPages,
      newPagesCats: Number(newPages),
      newPagesTags: Number(newPages),
      currentPage: 1
    };
  } else {
    return {
      newPosts: uniqBy(newByCategory.newPosts.concat(newByTag.newPosts), 'id'),
      newPages: 1,
      newPagesCats: Number(newByCategory.newPages),
      newPagesTags: Number(newByTag.newPages),
      currentPage: 0
    };
  }
}
