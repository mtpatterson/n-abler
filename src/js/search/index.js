import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { array } from 'prop-types';
import SearchPageItems from './SearchPageItems';
import { handleFetchPosts } from '../services';

function SearchPage({ searchResults }) {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(searchResults);
  const formRef = useRef();

  function handleSearchInputChange(e) {
    // set form input value
    setInput(e.target.value);

    // handle request and set value
    handleFetchPosts(e.target.value, setResults, false);
  }

  return (
    <div className="py-4 px-5 rounded shadow container bg-white">
      <h1>Search Results</h1>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <form
            ref={formRef}
            role="search"
            method="get"
            action="/"
            className="form-inline my-2 my-lg-0"
            autoComplete="off"
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              name="s"
              placeholder="Search"
              aria-label="Search"
              value={input}
              onChange={handleSearchInputChange}
            />
          </form>
        </div>
        <div className="col-md-6">
          {results && <SearchPageItems results={results} />}
        </div>
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  searchResults: array.isRequired
};

// use within PHP template to pass initial items from PHP to React
export function initSearchPage(searchResults) {
  const search = document.querySelector('.js-search-page');

  ReactDOM.render(<SearchPage searchResults={searchResults} />, search);
}
