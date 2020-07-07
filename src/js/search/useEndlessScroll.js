import { useEffect, useState } from 'react';
import { fetchFilteredPosts } from '../services';

export default function useEndlessScroll(
  initialPosts,
  query,
  pages,
  pagesCats,
  pagesTags,
  filteredBy,
  loading,
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

      if (!loading && nextPage <= pages) {
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
      const { innerHeight, scrollY } = window;
      const { offsetHeight } = document.body;

      const isScrolling =
        innerHeight + scrollY >= offsetHeight - offsetHeight / 2;

      const notFiltering =
        filteredBy.categories.length === 0 && filteredBy.tags.length === 0;

      if (isScrolling) {
        if (notFiltering) {
          return handleGetNewPage(
            pages,
            currentPage,
            setCurrentPage,
            'no filter'
          );
        }

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

    window.addEventListener('scroll', listenForBottom);

    return () => window.removeEventListener('scroll', listenForBottom);
  });

  return [posts, setPosts, setCurrentPage];
}
