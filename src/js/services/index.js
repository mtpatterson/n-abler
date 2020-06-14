import debounce from 'lodash/debounce';

export const PER_PAGE = '3';

export async function handleFetchPosts(query, params = '') {
  try {
    // use try block to test if the request is sucessful
    const res = await fetch(
      `/wp-json/wp/v2/posts?per_page=${PER_PAGE}&search=${query}${params}`
    );

    const posts = await res.json();
    const pages = res.headers.get('x-wp-totalpages');

    return { posts, pages };
  } catch (err) {
    console.log(err);
  }
}

export function fetchPostsNavbar(query, setResults) {
  // limit the request to every half a second
  debounce(async () => {
    if (query.trim('').length === 0) {
      // clear results
      return setResults(null);
    } else if (query.trim('').length < 2) {
      // search after 2 characters
      return false;
    }

    const { posts } = await handleFetchPosts(query);

    setResults(posts);

    // limit the request to every half a second
  }, 500)();
}

export function fetchPostsSearchPage(query, setResults, setPages) {
  // limit the request to every half a second
  debounce(async () => {
    if (query.trim('').length < 2) {
      // search after 2 characters
      return false;
    }

    if (query.trim('').length === 0) {
      // clear results
      setResults(null);
      setPages(1);

      return;
    }

    const { posts, pages } = await handleFetchPosts(query, '&_embed');

    setResults(posts);
    setPages(pages);

    // limit the request to every half a second
  }, 500)();
}
