import React from 'react';
import { array, func, object } from 'prop-types';

function SearchDropdownPosts({ posts, onKeyDown, firstResultRef }) {
  return (
    <div className="na-search-dropdown">
      {posts.length > 0 ? (
        posts.map(({ slug, title }, index) => {
          return (
            <a
              href={slug}
              className="na-search-dropdown-item btn"
              onKeyDown={onKeyDown}
              ref={index === 0 ? firstResultRef : null}
              key={slug}
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
}

SearchDropdownPosts.propTypes = {
  posts: array.isRequired,
  onKeyDown: func.isRequired,
  firstResultRef: object
};

export default SearchDropdownPosts;
