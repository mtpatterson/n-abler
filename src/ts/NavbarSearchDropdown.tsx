import * as React from 'react';
import { Post } from './types';
import { KeyboardEvent, LegacyRef } from 'react';
import { parseHTML, truncate } from './utils';

interface NavbarSearchDropdownProps {
  posts: Post[];
  handlePostsKeyDown: (e: KeyboardEvent<HTMLAnchorElement>) => void;
  firstAnchorRef: LegacyRef<HTMLAnchorElement>;
}

function NavbarSearchDropdown({
  posts,
  handlePostsKeyDown,
  firstAnchorRef
}: NavbarSearchDropdownProps): JSX.Element {
  return (
    <div className="na-search-dropdown">
      {posts.length > 0 ? (
        posts.map((post: Post, index: number) => {
          const { title, slug } = post;

          return (
            <a
              key={index}
              href={slug}
              onKeyDown={handlePostsKeyDown}
              ref={index === 0 ? firstAnchorRef : null}
              className="na-search-dropdown-item btn"
            >
              {truncate(parseHTML(title.rendered))}
            </a>
          );
        })
      ) : (
        <div className="na-search-dropdown-item btn">No results found</div>
      )}
    </div>
  );
}

export default NavbarSearchDropdown;
