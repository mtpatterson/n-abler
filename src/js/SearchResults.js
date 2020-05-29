import React from 'react';
import { array, func, object } from 'prop-types';

function SearchResultItem({ results, onClick, onKeyDown, firstResultRef }) {
  return (
    <div
      className={'na-search-results' + (results.length === 0 ? ' hidden' : '')}
    >
      {results.length > 0 ? (
        results.map(({ slug, title }, index) => {
          return (
            <button
              key={slug}
              type="button"
              className="na-search-results-item btn"
              title={title.rendered}
              onClick={() => onClick(title.rendered)}
              onKeyDown={onKeyDown}
              ref={index === 0 ? firstResultRef : null}
            >
              {title.rendered}
            </button>
          );
        })
      ) : (
        <div className="na-search-results-item btn">No results found</div>
      )}
    </div>
  );
}

SearchResultItem.propTypes = {
  results: array.isRequired,
  onClick: func.isRequired,
  onKeyDown: func.isRequired,
  firstResultRef: object
};

export default SearchResultItem;
