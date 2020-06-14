import React, { useEffect, useRef, useState, Fragment } from 'react';
import { string } from 'prop-types';
import SearchDropdownItems from './SearchDropdownItems';
import { fetchPostsNavbar } from './services';

export default function SearchForm({ postReq }) {
  // hooks to manage state
  // when you call setQuery, the input value will update
  // and reflect changes in the returned JSX below
  const [query, setQuery] = useState(postReq ? postReq : '');
  const [posts, setPosts] = useState(null);
  const [submit, setSubmit] = useState(false);

  // DOM element references used in returned JSX below
  const formRef = useRef();
  const inputRef = useRef();
  const firstResultRef = useRef();

  // used to submit form with latest input value
  useEffect(() => {
    if (submit) {
      formRef.current.submit();
    }
  }, [submit]);

  function handleInputChange(e) {
    // set form input value
    setQuery(e.target.value);

    // handle request and set value
    fetchPostsNavbar(e.target.value, setPosts);
  }

  function onInputKeydown(e) {
    if (e.key === 'ArrowDown' && firstResultRef.current) {
      firstResultRef.current.focus();
    }
  }

  function handlePostsClick(titleRendered) {
    setQuery(titleRendered);
    setSubmit(true);
  }

  function handlePostsKeyDown(e) {
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
          value={query}
          onChange={handleInputChange}
          onKeyDown={onInputKeydown}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      {posts && (
        <SearchDropdownItems
          posts={posts}
          onClick={handlePostsClick}
          onKeyDown={handlePostsKeyDown}
          firstResultRef={firstResultRef}
        />
      )}
    </Fragment>
  );
}

SearchForm.propTypes = {
  postReq: string.isRequired
};
