import React from 'react';
import { array, func, object } from 'prop-types';

function SearchDropdownItems({ results, onClick, onKeyDown, firstResultRef }) {
  return (
    <div className="na-search-dropdown">
      {results.length > 0 ? (
        results.map(({ slug, title }, index) => {
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
  results: array.isRequired,
  onClick: func.isRequired,
  onKeyDown: func.isRequired,
  firstResultRef: object
};

export default SearchDropdownItems;
