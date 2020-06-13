import React, { useEffect, useRef, useState, Fragment } from 'react';
import { string } from 'prop-types';
import SearchDropdownItems from './SearchDropdownItems';
import { handleFetchPosts } from '../services';

function SearchForm({ postReq }) {
  // hooks to manage state
  // when you call setInput, the input value will update
  // and reflect changes in the returned JSX below
  const [input, setInput] = useState(postReq ? postReq : '');
  const [results, setResults] = useState(null);
  const [submit, setSubmit] = useState(false);

  // DOM element references used in returned JSX below
  const formRef = useRef();
  const inputRef = useRef();
  const firstResultRef = useRef();

  // handles side effects of the state changes above
  // used to submit form with latest input value
  useEffect(() => {
    if (submit) {
      formRef.current.submit();
    }
  }, [submit]);

  function handleInputChange(e) {
    // set form input value
    setInput(e.target.value);

    // handle request and set value
    handleFetchPosts(e.target.value, setResults);
  }

  function onInputKeydown(e) {
    if (e.key === 'ArrowDown' && firstResultRef.current) {
      firstResultRef.current.focus();
    }
  }

  function handleResultsClick(titleRendered) {
    setInput(titleRendered);
    setSubmit(true);
  }

  function handleResultsKeyDown(e) {
    if (e.key === 'ArrowDown' && firstResultRef.current) {
      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.focus();
      }
    } else if (e.key === 'ArrowUp') {
      if (e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
      } else {
        inputRef.current.focus();
      }
    }
  }

  return (
    <Fragment>
      <form
        ref={formRef}
        role="search"
        method="get"
        action="/"
        className="na-search-form form-inline my-2 my-lg-0"
        autoComplete="off"
      >
        <input
          ref={inputRef}
          className="form-control mr-sm-2"
          type="search"
          name="s"
          placeholder="Search"
          aria-label="Search"
          value={input}
          onChange={handleInputChange}
          onKeyDown={onInputKeydown}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      {results && (
        <SearchDropdownItems
          results={results}
          onClick={handleResultsClick}
          onKeyDown={handleResultsKeyDown}
          firstResultRef={firstResultRef}
        />
      )}
    </Fragment>
  );
}

SearchForm.propTypes = {
  postReq: string.isRequired
};

export default SearchForm;
