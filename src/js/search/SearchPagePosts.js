import React from 'react';
import { array } from 'prop-types';
import { resizeUrl } from '../utils';

export default function SearchPagePosts({ posts }) {
  return (
    <div className="na-cards">
      {posts.map(({ id, title, _embedded = null }) => {
        let sourceUrl;

        if (_embedded.featured_media) {
          // url from template
          sourceUrl = _embedded.featured_media;
        } else if (_embedded['wp:featuredmedia']) {
          // url from REST API
          sourceUrl = resizeUrl(_embedded, 'medium');
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

SearchPagePosts.propTypes = {
  posts: array.isRequired
};
