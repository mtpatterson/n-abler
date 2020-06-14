import { useEffect, useState } from 'react';
import { handleFetchPosts } from '../services';

export default function useEndlessScroll(
  searchResults,
  query,
  pages,
  setLoading
) {
  const [prevQuery, setPrevQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState(searchResults);

  // reset current page when query changes
  useEffect(() => {
    if (query !== prevQuery) {
      setCurrentPage(1);
    }
  }, [query, prevQuery]);

  useEffect(() => {
    async function listenForBottom() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const nextPage = currentPage + 1;

        if (nextPage <= pages) {
          setCurrentPage(nextPage);
          setPrevQuery(query);
          setLoading(true);

          const { posts } = await handleFetchPosts(
            query,
            `&page=${nextPage}&_embed`
          );

          setResults(results.concat(posts));
          setLoading(false);
        }
      }
    }

    window.addEventListener('scroll', listenForBottom);

    return () => window.removeEventListener('scroll', listenForBottom);
  });

  return [results, setResults];
}
