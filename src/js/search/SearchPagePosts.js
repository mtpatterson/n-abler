import React from 'react';
import { array } from 'prop-types';
import { resizeUrl } from '../utils';

export default function SearchPagePosts({ posts }) {
  return posts.map(({ id, title, _embedded = false }) => {
    return (
      <div className="na-card card" key={id}>
        {/* each item needs a unique key prop */}
        <p className="card-title">{title && title.rendered}</p>
        <div className="card-body">
          {/* show image only if image exists */}
          {_embedded['wp:featuredmedia'] && (
            <img
              src={resizeUrl(_embedded['wp:featuredmedia'], 'medium')}
              alt={title && title.rendered}
            />
          )}
        </div>
      </div>
    );
  });
}

SearchPagePosts.propTypes = {
  posts: array.isRequired
};
