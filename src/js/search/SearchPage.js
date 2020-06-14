import React, { useRef, useState, Fragment } from 'react';
import { array, number } from 'prop-types';
import SearchPagePosts from './SearchPagePosts';
import { fetchPostsSearchPage } from '../services';
import useEndlessScroll from './useEndlessScroll';

export default function SearchPage({ initialPosts, maxNumPages }) {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(window.location.search.split('=')[1]);
  const [pages, setPages] = useState(maxNumPages);
  const [posts, setPosts] = useEndlessScroll(
    initialPosts,
    query,
    pages,
    setLoading
  );
  const formRef = useRef();

  function handleSearchInputChange(e) {
    // set form input value
    setQuery(e.target.value);

    // handle request and set value
    fetchPostsSearchPage(e.target.value, setPosts, setPages);
  }

  return (
    <div className="py-4 px-5 rounded shadow container bg-white">
      <h1>Search Results</h1>
      <div className="row">
        <div className="col-xs-12 col-md-4">
          <form
            ref={formRef}
            role="search"
            method="get"
            action="/"
            className="form-inline my-2 my-lg-0"
            autoComplete="off"
            onSubmit={e => e.preventDefault()}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={handleSearchInputChange}
            />
          </form>
        </div>
        <div className="col-md-8">
          {posts && posts.length > 0 ? (
            <Fragment>
              <SearchPagePosts posts={posts} />
              <p className="text-center">
                {loading && <i className="fa fa-spinner fa-spin fa-fw"></i>}
              </p>
            </Fragment>
          ) : (
            <div>No results</div>
          )}
        </div>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  maxNumPages: number.isRequired,
  initialPosts: array.isRequired
};
