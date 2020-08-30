import * as React from 'react';
import { ChangeEvent, KeyboardEvent, Fragment, useRef, useState } from 'react';
import { Post } from './types';
import { debounceFetchPosts } from './services';
import NavbarSearchDropdown from './NavbarSearchDropdown';

function NavbarSearch({ postReq }: { postReq: string }): JSX.Element {
  const [query, setQuery] = useState<string>(postReq ? postReq : '');
  const [posts, setPosts] = useState<Post[] | []>(null);

  // DOM element references used in returned JSX below
  const inputRef = useRef<HTMLInputElement | null>(null);
  const firstAnchorRef = useRef<HTMLAnchorElement | null>(null);

  async function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const currentTarget = e.currentTarget as HTMLInputElement;

    // set form input value
    setQuery(currentTarget.value);

    if (currentTarget.value.length === 0) {
      setPosts(null);
    }

    if (currentTarget.value.length <= 2) {
      // search after 2 characters
      return;
    }

    // handle request and set value
    const { newPosts } = await debounceFetchPosts(currentTarget.value);

    setPosts(newPosts);
  }

  function onInputKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' && firstAnchorRef.current) {
      e.preventDefault();

      firstAnchorRef.current.focus();
    }
  }

  function handlePostsKeyDown(e: KeyboardEvent) {
    const currentTarget = e.currentTarget as HTMLInputElement;

    if (e.key === 'ArrowDown' && firstAnchorRef.current) {
      e.preventDefault();

      const nextElement = currentTarget.nextElementSibling as HTMLElement;

      if (nextElement) {
        nextElement.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();

      const previousElement = currentTarget.previousSibling as HTMLElement;

      if (previousElement) {
        previousElement.focus();
      } else {
        inputRef.current.focus();
      }
    } else if (e.key === 'Escape') {
      inputRef.current.focus();
    }
  }

  return (
    <Fragment>
      <form
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
              className="btn btn-warning my-2 my-sm-0"
              aria-label="Search"
              title="Search"
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
      {posts && (
        <NavbarSearchDropdown
          posts={posts}
          handlePostsKeyDown={handlePostsKeyDown}
          firstAnchorRef={firstAnchorRef}
        />
      )}
    </Fragment>
  );
}

export default NavbarSearch;
