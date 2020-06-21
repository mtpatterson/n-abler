import React, { useState } from 'react';
import { array, number } from 'prop-types';
import SearchPagePosts from './SearchPagePosts';
import { fetchFilteredPosts } from '../services';
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
  const [filteredBy, setFilteredBy] = useState({ categories: [], tags: [] });
  const [posts, setPosts, setCurrentPage] = useEndlessScroll(
    initialPosts,
    query,
    pages,
    filteredBy,
    setLoading
  );

  async function handleSearchInputChange(e) {
    // set form input value
    setQuery(e.target.value);

    const {
      newPosts,
      newPages,
      currentPage = false
    } = await fetchFilteredPosts(e.target.value, filteredBy);

    setPosts(newPosts);
    setPages(newPages);

    if (currentPage) {
      setCurrentPage(currentPage);
    }
  }

  async function handleFilterByTerm(term_id, type) {
    const found = filteredBy[type].find(i => i === term_id);

    if (!found) {
      filteredBy[type].push(term_id);
    } else {
      filteredBy[type] = filteredBy[type].filter(i => i !== term_id);
    }

    setFilteredBy(filteredBy);

    const { newPosts, newPages, currentPage } = await fetchFilteredPosts(
      query,
      filteredBy
    );

    setPosts(newPosts);
    setPages(newPages);

    if (currentPage) {
      setCurrentPage(currentPage);
    }
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
              role="textbox"
              value={query}
              onChange={handleSearchInputChange}
            />
            <div>
              <h2>Categories:</h2>
              {categories.map((cat, index) => {
                return (
                  <TermItem
                    key={cat.term_id}
                    index={index}
                    name={cat.cat_name}
                    count={cat.category_count}
                    handleFilterByTerm={() =>
                      handleFilterByTerm(cat.term_id, 'categories')
                    }
                  />
                );
              })}
            </div>
            <div>
              <h2>Tags:</h2>
              {tags.map((tag, index) => {
                return (
                  <TermItem
                    key={tag.term_id}
                    index={index}
                    name={tag.name}
                    count={tag.count}
                    handleFilterByTerm={() =>
                      handleFilterByTerm(tag.term_id, 'tags')
                    }
                  />
                );
              })}
            </div>
          </form>
        </div>
        <div className="col-md-8">
          {posts && posts.length > 0 ? (
            <div className="na-cards" data-testid="search-page-posts">
              <SearchPagePosts posts={posts} />
              {loading && (
                <p className="text-center">
                  <i className="fa fa-spinner fa-spin fa-fw"></i>
                </p>
              )}
            </div>
          ) : (
            <div>No results found</div>
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
