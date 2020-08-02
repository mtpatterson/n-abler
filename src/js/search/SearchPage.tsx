import * as React from 'react';
import { FormEvent, Fragment, useState } from 'react';
import { FilteredBy, Category, Post, Tag } from '../types';
import SearchPagePosts from './SearchPagePosts';
import { fetchFilteredPosts } from '../services';
import useEndlessScroll from './useEndlessScroll';
import TermItem from './TermItem';

interface SearchPageProps {
  initialPosts: Post[];
  categories: Category[];
  tags: Tag[];
  maxNumPages: number;
}

function SearchPage({
  initialPosts,
  categories,
  tags,
  maxNumPages
}: SearchPageProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(
    window.location.search.split('=')[1]
  );
  const [pages, setPages] = useState<number>(maxNumPages);
  const [pagesCats, setPagesCats] = useState<number>(1);
  const [pagesTags, setPagesTags] = useState<number>(1);
  const [filteredBy, setFilteredBy] = useState<FilteredBy>({
    categories: [],
    tags: []
  });
  const [posts, setPosts, setCurrentPage] = useEndlessScroll(
    initialPosts,
    query,
    pages,
    pagesCats,
    pagesTags,
    filteredBy,
    loading,
    setLoading
  );

  async function handleSearchFilter(newQuery: string): Promise<void> {
    const {
      newPosts,
      newPages,
      newPagesCats,
      newPagesTags,
      currentPage
    } = await fetchFilteredPosts(newQuery, filteredBy);

    setPosts(newPosts);
    setPages(newPages);
    setPagesCats(newPagesCats);
    setPagesTags(newPagesTags);

    if (currentPage !== 0) {
      setCurrentPage(currentPage);
    }
  }

  function handleSearchInputChange(e: FormEvent<HTMLInputElement>): void {
    const newQuery = e.currentTarget.value;

    setQuery(newQuery);

    handleSearchFilter(newQuery);
  }

  function handleFilterByTerm(term_id: number, filterType: string): void {
    const found = filteredBy[filterType].find((i: number) => i === term_id);

    if (!found) {
      filteredBy[filterType].push(term_id);
    } else {
      filteredBy[filterType] = filteredBy[filterType].filter(
        (i: number) => i !== term_id
      );
    }

    setCurrentPage(1);
    setFilteredBy(filteredBy);

    handleSearchFilter(query);
  }

  return (
    <div className="na-search-page-container py-4 px-5 rounded shadow container bg-white">
      <h1>Search Results</h1>
      <div className="row">
        <div className="col-xs-12 col-md-4">
          <form
            role="search"
            method="get"
            action="/"
            className="my-2 my-lg-0"
            autoComplete="off"
            onSubmit={e => e.preventDefault()}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              role="textbox"
              value={query}
              onChange={handleSearchInputChange}
            />
            {categories.length > 0 && (
              <Fragment>
                <br />
                <h2>Categories:</h2>
                {categories.map((category: Category, index: number) => {
                  const { cat_name, category_count, term_id } = category;

                  return (
                    <TermItem
                      key={term_id}
                      index={index}
                      name={cat_name}
                      count={category_count}
                      handleFilterByTerm={() => {
                        handleFilterByTerm(term_id, 'categories');
                      }}
                    />
                  );
                })}
              </Fragment>
            )}
            {tags.length > 0 && (
              <Fragment>
                <h2>Tags:</h2>
                {tags.map((tag: Tag, index: number) => {
                  const { count, name, term_id } = tag;

                  return (
                    <TermItem
                      key={term_id}
                      index={index}
                      name={name}
                      count={count}
                      handleFilterByTerm={() => {
                        handleFilterByTerm(term_id, 'tags');
                      }}
                    />
                  );
                })}
              </Fragment>
            )}
          </form>
        </div>
        <div className="na-search-results col-md-8">
          {posts && posts.length > 0 ? (
            <Fragment>
              <div className="na-cards" data-testid="search-page-posts">
                <SearchPagePosts posts={posts} />
              </div>
              <p className="text-center">
                {loading && <i className="fa fa-spinner fa-spin fa-fw"></i>}
              </p>
            </Fragment>
          ) : (
            <div>No results found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
