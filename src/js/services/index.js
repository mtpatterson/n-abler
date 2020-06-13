import debounce from 'lodash/debounce';

export function handleFetchPosts(targetValue, setResults, shouldClear = true) {
  // limit the request to every half a second
  debounce(async () => {
    if (shouldClear) {
      if (targetValue.trim('').length === 0) {
        // clear results
        return setResults(null);
      } else if (targetValue.trim('').length < 2) {
        // search after 2 characters
        return false;
      }
    }

    try {
      // use try block to test if the request is sucessful
      const res = await fetch(`/wp-json/wp/v2/posts?search=${targetValue}`);
      const posts = await res.json();

      setResults(posts);
    } catch (err) {
      console.log(err);
    }
    // limit the request to every half a second
  }, 500)();
}
