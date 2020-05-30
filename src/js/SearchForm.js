import React, { useEffect, useRef, useState } from 'react';
import { string } from 'prop-types';
import debounce from 'lodash/debounce';
import SearchResults from './SearchResults';

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

  // async to make a request and await the response
  async function handleFetchPosts(targetValue) {
    if (targetValue.trim('').length === 0) {
      // clear results
      return setResults(null);
    } else if (targetValue.trim('').length < 2) {
      // search after 2 characters
      return false;
    }

    try {
      // use try block to test if the request is sucessful
      const res = await fetch(`/wp-json/wp/v2/posts?search=${targetValue}`);
      const posts = await res.json();

      setResults(posts);
    } catch (err) {
      console.log(err);
    }
  }

  function handleInputChange(e) {
    setInput(e.target.value);

    // limit the request to every half a second
    debounce(handleFetchPosts, 500)(e.target.value);
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
      {results && (
        <SearchResults
          results={results}
          onClick={handleResultsClick}
          onKeyDown={handleResultsKeyDown}
          firstResultRef={firstResultRef}
        />
      )}
    </form>
  );
}

SearchForm.propTypes = {
  postReq: string.isRequired
};

export default SearchForm;
