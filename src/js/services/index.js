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

export function fetchPostsNavbar(query) {
  if (query.trim('').length < 2) {
    // search after 2 characters
    return {};
  }

  return debounce(() => handleFetchPosts(query), 500, {
    leading: true
  })();
}

export function fetchPostsSearchPage(query, params) {
  return debounce(() => handleFetchPosts(query, params), 500, {
    leading: true
  })();
}
