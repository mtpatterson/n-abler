import { useEffect, useState } from 'react';
import { handleFetchPosts } from '../services';

export default function useEndlessScroll(
  initialPosts,
  query,
  pages,
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

          const { newPosts } = await handleFetchPosts(
            query,
            `&page=${nextPage}&_embed`
          );

          setPosts(posts.concat(newPosts));
          setLoading(false);
        }
      }
    }

    window.addEventListener('scroll', listenForBottom);

    return () => window.removeEventListener('scroll', listenForBottom);
  });

  return [posts, setPosts];
}
