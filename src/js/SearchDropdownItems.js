import React from 'react';
import { array, func, object } from 'prop-types';

function SearchDropdownItems({ posts, onClick, onKeyDown, firstResultRef }) {
  return (
    <div className="na-search-dropdown">
      {posts.length > 0 ? (
        posts.map(({ slug, title }, index) => {
          return (
            <button
              type="button"
              className="na-search-dropdown-item btn"
              title={title.rendered}
              onClick={() => onClick(title.rendered)}
              onKeyDown={onKeyDown}
              ref={index === 0 ? firstResultRef : null}
              key={slug}
            >
              {title.rendered}
            </button>
          );
        })
      ) : (
        <div className="na-search-dropdown-item btn">No results found</div>
      )}
    </div>
  );
}

SearchDropdownItems.propTypes = {
  posts: array.isRequired,
  onClick: func.isRequired,
  onKeyDown: func.isRequired,
  firstResultRef: object
};

export default SearchDropdownItems;
