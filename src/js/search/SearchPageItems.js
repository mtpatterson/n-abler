import React from 'react';
import { array } from 'prop-types';

export default function SearchPageItems({ results }) {
  return (
    <div className="na-cards">
      {results.map(({ id, title, _embedded = false }) => {
        let sourceUrl;

        // url from template
        if (_embedded.featured_media) {
          sourceUrl = _embedded.featured_media;
        } else if (_embedded['wp:featuredmedia']) {
          // url from REST API
          sourceUrl =
            _embedded['wp:featuredmedia'][0].media_details.sizes.medium
              .source_url;
        }

        return (
          <div className="na-card card" key={id}>
            {/* each item needs a unique key prop */}
            <p className="card-title">{title.rendered}</p>
            <div className="card-body">
              {/* show image only if image exists */}
              {sourceUrl && <img src={sourceUrl} alt={title} />}
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
