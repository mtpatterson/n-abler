import React, { useState } from 'react';
import { array, number } from 'prop-types';
import SearchPagePosts from './SearchPagePosts';
import { fetchPostsSearchPage } from '../services';
import useEndlessScroll from './useEndlessScroll';
import TermItem from './TermItem';

export default function SearchPage({
  initialPosts,
  categories,
  tags,
  maxNumPages
}) {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(window.location.search.split('=')[1]);
  const [pages, setPages] = useState(maxNumPages);
  const [posts, setPosts] = useEndlessScroll(
    initialPosts,
    query,
    pages,
    setLoading
  );

  function handleSearchInputChange(e) {
    // set form input value
    setQuery(e.target.value);

    // handle request and set value
    fetchPostsSearchPage(e.target.value, setPosts, setPages);
  }

  function handleToggleTerms(e) {
    console.log(e);
  }

  return (
    <div className="py-4 px-5 rounded shadow container bg-white">
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
              value={query}
              onChange={handleSearchInputChange}
            />
            <div>
              <h2>Categories:</h2>
              {categories.map(cat => {
                return (
                  <TermItem
                    key={cat.term_id}
                    name={cat.cat_name}
                    count={cat.category_count}
                    slug={cat.slug}
                    onClick={handleToggleTerms}
                  />
                );
              })}
            </div>
            <div>
              <h2>Tags:</h2>
              {tags.map(tag => {
                return (
                  <TermItem
                    key={tag.term_id}
                    name={tag.name}
                    count={tag.count}
                    slug={tag.slug}
                    onClick={handleToggleTerms}
                  />
                );
              })}
            </div>
          </form>
        </div>
        <div className="col-md-8">
          {posts && posts.length > 0 ? (
            <div className="na-cards">
              <SearchPagePosts posts={posts} />
              <p className="text-center">
                {loading && <i className="fa fa-spinner fa-spin fa-fw"></i>}
              </p>
            </div>
          ) : (
            <div>No results</div>
          )}
        </div>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  initialPosts: array.isRequired,
  categories: array.isRequired,
  tags: array.isRequired,
  maxNumPages: number.isRequired
};
