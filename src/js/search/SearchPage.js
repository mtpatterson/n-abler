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
  const [filteredBy, setFilteredBy] = useState({ categories: [], tags: [] });
  const [posts, setPosts, setCurrentPage] = useEndlessScroll(
    initialPosts,
    query,
    pages,
    setLoading,
    filteredBy
  );

  async function handleSearchByFilter(value = query) {
    let newByCategory = {
      newPosts: []
    };
    let newByTag = {
      newPosts: []
    };

    // only make request for categories if filtering by category
    if (filteredBy.categories.length > 0) {
      newByCategory = await fetchPostsSearchPage(
        value,
        `&_embed&categories=${filteredBy.categories}`
      );
    }

    // only make request for tags if filtering by tag
    if (filteredBy.tags.length > 0) {
      newByTag = await fetchPostsSearchPage(
        value,
        `&_embed&tags=${filteredBy.tags}`
      );
    }

    const allFiltersRemoved =
      filteredBy.categories.length === 0 && filteredBy.tags.length === 0;

    if (allFiltersRemoved) {
      const { newPosts, newPages } = await fetchPostsSearchPage(
        value,
        '&_embed'
      );

      setPosts(newPosts);
      setPages(newPages);
      setCurrentPage(1);
    } else {
      setPosts(newByCategory.newPosts.concat(newByTag.newPosts));
      setPages(newByCategory.newPages + newByTag.newPages);
    }
  }

  async function handleSearchInputChange(e) {
    // set form input value
    setQuery(e.target.value);

    handleSearchByFilter(e.target.value);
  }

  async function handleFilterByTerm(term_id, type) {
    const found = filteredBy[type].find(i => i === term_id);

    if (!found) {
      filteredBy[type].push(term_id);
    } else {
      filteredBy[type] = filteredBy[type].filter(i => i !== term_id);
    }

    setFilteredBy(filteredBy);

    handleSearchByFilter();
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
                    handleFilterByTerm={() =>
                      handleFilterByTerm(cat.term_id, 'categories')
                    }
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
            <div className="na-cards">
              <SearchPagePosts posts={posts} />
              <p className="text-center">
                {loading && <i className="fa fa-spinner fa-spin fa-fw"></i>}
              </p>
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
