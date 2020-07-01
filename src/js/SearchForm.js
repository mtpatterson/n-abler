import React, { useEffect, useRef, useState, Fragment } from 'react';
import { string } from 'prop-types';
import SearchDropdownPosts from './SearchDropdownPosts';
import { debounceFetchPosts } from './services';

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

  async function handleInputChange(e) {
    // set form input value
    setQuery(e.target.value);

    if (e.target.value.length === 0) {
      setPosts(null);
    }

    if (e.target.value.length <= 2) {
      // search after 2 characters
      return;
    }

    // handle request and set value
    const { newPosts } = await debounceFetchPosts(e.target.value);

    setPosts(newPosts);
  }

  function onInputKeydown(e) {
    if (e.key === 'ArrowDown' && firstResultRef.current) {
      e.preventDefault();

      firstResultRef.current.focus();
    }
  }

  function handlePostsClick(titleRendered) {
    setQuery(titleRendered);
    setSubmit(true);
  }

  function handlePostsKeyDown(e) {
    if (e.key === 'ArrowDown' && firstResultRef.current) {
      e.preventDefault();

      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();

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
        <div className="input-group na-search-group">
          <input
            ref={inputRef}
            className="form-control na-search-input"
            type="search"
            name="s"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onChange={handleInputChange}
            onKeyDown={onInputKeydown}
          />
          <div className="input-group-append">
            <button
              type="submit"
              className="btn btn-outline-success my-2 my-sm-0"
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
      {posts && (
        <SearchDropdownPosts
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
