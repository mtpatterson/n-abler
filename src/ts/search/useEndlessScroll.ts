import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FilteredBy, Post } from '../types';
import { fetchFilteredPosts } from '../services';

export default function useEndlessScroll(
  initialPosts: Post[],
  query: string,
  pages: number,
  pagesCats: number,
  pagesTags: number,
  filteredBy: FilteredBy,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
): [
  Post[],
  Dispatch<SetStateAction<Post[]>>,
  Dispatch<SetStateAction<number>>
] {
  const [prevQuery, setPrevQuery] = useState<string>(query);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageCats, setCurrentPageCats] = useState<number>(1);
  const [currentPageTags, setCurrentPageTags] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  // reset current page when query changes
  useEffect(() => {
    if (query !== prevQuery) {
      setCurrentPage(1);
    }
  }, [query, prevQuery]);

  useEffect(() => {
    async function handleGetNewPage(
      pages: number,
      current: number,
      setCurrent: Dispatch<SetStateAction<number>>,
      scrollingType: string
    ) {
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
