import * as React from 'react';
import { FC } from 'react';
import { KeyboardEvent, LegacyRef } from 'react';

interface NavbarSearchDropdownProps {
  posts: Array<Record<string, unknown>>;
  handlePostsKeyDown: (e: KeyboardEvent<HTMLAnchorElement>) => void;
  firstAnchorRef: LegacyRef<HTMLAnchorElement>;
}

const NavbarSearchDropdown: FC<NavbarSearchDropdownProps> = ({
  posts,
  handlePostsKeyDown,
  firstAnchorRef
}: NavbarSearchDropdownProps) => {
  return (
    <div className="na-search-dropdown">
      {posts.length > 0 ? (
        posts.map((post: Record<string, unknown>, index: number) => {
          interface PostTitle {
            rendered: string;
          }

          const title = post.title as PostTitle;
          const slug = post.slug as string;

          return (
            <a
              key={index}
              href={slug}
              onKeyDown={handlePostsKeyDown}
              ref={index === 0 ? firstAnchorRef : null}
              className="na-search-dropdown-item btn"
            >
              {title.rendered}
            </a>
          );
        })
      ) : (
        <div className="na-search-dropdown-item btn">No results found</div>
      )}
    </div>
  );
};

export default NavbarSearchDropdown;
