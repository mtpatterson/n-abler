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

export function fetchPostsNavbar(query, setPosts) {
  // limit the request to every half a second
  debounce(async () => {
    if (query.trim('').length === 0) {
      // clear posts
      return setPosts(null);
    } else if (query.trim('').length < 2) {
      // search after 2 characters
      return false;
    }

    const { newPosts } = await handleFetchPosts(query);

    setPosts(newPosts);

    // limit the request to every half a second
  }, 500)();
}

export function fetchPostsSearchPage(query, setPosts, setPages) {
  // limit the request to every half a second
  debounce(async () => {
    if (query.trim('').length < 2) {
      // search after 2 characters
      return false;
    }

    if (query.trim('').length === 0) {
      // clear posts
      setPosts(null);
      setPages(1);

      return;
    }

    const { newPosts, newPages } = await handleFetchPosts(query, '&_embed');

    setPosts(newPosts);
    setPages(newPages);

    // limit the request to every half a second
  }, 500)();
}
