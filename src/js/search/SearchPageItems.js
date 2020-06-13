import React from 'react';
import { array } from 'prop-types';

function SearchPageItems({ results }) {
  return (
    <div>
      {results.map(({ id, thumbnail, title }) => {
        return (
          <div className="card" key={id}>
            {/* each item needs a unique key prop */}
            <p className="card-title">{title.rendered}</p>
            <div className="card-body">
              {/* show image only if thumbnail exists */}
              {thumbnail && <img src={thumbnail} alt={title} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

SearchPageItems.propTypes = {
  results: array.isRequired
};

export default SearchPageItems;
