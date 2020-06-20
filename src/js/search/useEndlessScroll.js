import { useEffect, useState } from 'react';
import { handleSearchByFilter } from '../services';

export default function useEndlessScroll(
  initialPosts,
  query,
  pages,
  filteredBy,
  setLoading
) {
  const [prevQuery, setPrevQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(initialPosts);

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

          const { newPosts } = await handleSearchByFilter(
            query,
            filteredBy,
            `&page=${nextPage}`
          );

          setPosts(posts.concat(newPosts));
          setLoading(false);
        }
      }
    }

    window.addEventListener('scroll', listenForBottom);

    return () => window.removeEventListener('scroll', listenForBottom);
  });

  return [posts, setPosts, setCurrentPage];
}
