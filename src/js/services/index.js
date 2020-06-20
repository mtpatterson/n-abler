import debounce from 'lodash/debounce';

// WordPress default is 10
export const PER_PAGE = '10';

export async function handleFetchPosts(query, params = '') {
  try {
    // use try block to test if the request is sucessful
    const res = await fetch(
      `/wp-json/wp/v2/posts?per_page=${PER_PAGE}&search=${query}${params}`
    );

    const newPosts = await res.json();
    const newPages = res.headers.get('x-wp-totalpages');

    return { newPosts, newPages };
  } catch (err) {
    console.log(err);
  }
}

export function debounceRequestPosts(query, params) {
  return debounce(() => handleFetchPosts(query, params), 500, {
    leading: true
  })();
}

export async function handleSearchByFilter(
  value,
  filteredBy,
  pageParam = false
) {
  let newByCategory = {
    newPosts: [],
    newPages: 0
  };
  let newByTag = {
    newPosts: [],
    newPages: 0
  };

  // only make request for categories if filtering by category
  if (filteredBy.categories.length > 0) {
    newByCategory = await handleFetchPosts(
      value,
      `&_embed&categories=${filteredBy.categories}${pageParam ? pageParam : ''}`
    );
  }

  // only make request for tags if filtering by tag
  if (filteredBy.tags.length > 0) {
    newByTag = await handleFetchPosts(
      value,
      `&_embed&tags=${filteredBy.tags}${pageParam ? pageParam : ''}`
    );
  }

  const allFiltersRemoved =
    filteredBy.categories.length === 0 && filteredBy.tags.length === 0;

  if (allFiltersRemoved) {
    const { newPosts, newPages } = await handleFetchPosts(
      value,
      `&_embed${pageParam ? pageParam : ''}`
    );

    return {
      newPosts,
      newPages,
      currentPage: 1
    };
  } else {
    return {
      newPosts: newByCategory.newPosts.concat(newByTag.newPosts),
      newPages: Number(newByCategory.newPages) + newByTag.newPages,
      currentPage: false
    };
  }
}
