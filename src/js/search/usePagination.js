import { useEffect, useState } from 'react';
import { PER_PAGE } from '../services';

export default function usePagination(query) {
  const [pages, setPages] = useState(1);

  useEffect(() => {
    async function fetchPagination() {
      try {
        const res = await fetch(
          `/wp-json/wp/v2/posts?search=${query}&per_page=${PER_PAGE}`
        );
        const pages = res.headers.get('x-wp-totalpages');

        setPages(Number(pages));
      } catch (err) {
        console.log(err);
      }
    }

    fetchPagination();
  }, [query]);

  return pages;
}
