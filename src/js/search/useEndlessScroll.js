import { useEffect, useState } from 'react';
import { fetchFilteredPosts } from '../services';

export default function useEndlessScroll(
  initialPosts,
  query,
  pages,
  pagesCats,
  pagesTags,
  filteredBy,
  setLoading
) {
  const [prevQuery, setPrevQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCats, setCurrentPageCats] = useState(1);
  const [currentPageTags, setCurrentPageTags] = useState(1);
  const [posts, setPosts] = useState(initialPosts);

  // reset current page when query changes
  useEffect(() => {
    if (query !== prevQuery) {
      setCurrentPage(1);
    }
  }, [query, prevQuery]);

  useEffect(() => {
    async function handleGetNewPage(pages, current, setCurrent, scrollingType) {
      const nextPage = current + 1;

      if (nextPage <= pages) {
        setCurrent(nextPage);
        setPrevQuery(query);
        setLoading(true);

        const { newPosts } = await fetchFilteredPosts(
          query,
          filteredBy,
          `&page=${nextPage}`,
          scrollingType
        );

        setPosts(posts.concat(newPosts));
        setLoading(false);
      }
    }

    function listenForBottom() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (
          filteredBy.categories.length === 0 &&
          filteredBy.categories.length === 0
        ) {
          handleGetNewPage(pages, currentPage, setCurrentPage, 'no filter');
        } else {
          if (filteredBy.categories.length > 0) {
            handleGetNewPage(
              pagesCats,
              currentPageCats,
              setCurrentPageCats,
              'cats'
            );
          }

          if (filteredBy.tags.length > 0) {
            handleGetNewPage(
              pagesTags,
              currentPageTags,
              setCurrentPageTags,
              'tags'
            );
          }
        }
      }
    }

    window.addEventListener('scroll', listenForBottom);

    return () => window.removeEventListener('scroll', listenForBottom);
  });

  return [posts, setPosts, setCurrentPage];
}
