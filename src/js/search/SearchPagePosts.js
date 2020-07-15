import React from 'react';
import { array } from 'prop-types';
import { normalizeUrl } from '../utils';

export default function SearchPagePosts({ posts }) {
  return posts.map(({ id, slug, title, _embedded = false }) => {
    return (
      <a className="na-card card" href={slug} key={id}>
        <div>
          {/* each item needs a unique key prop */}
          <p className="card-title">{title && title.rendered}</p>
          <div className="card-body">
            {/* show image only if image exists */}
            {_embedded['wp:featuredmedia'] && (
              <img
                src={normalizeUrl(_embedded['wp:featuredmedia'])}
                alt={title && title.rendered}
              />
            )}
          </div>
        </div>
      </a>
    );
  });
}

SearchPagePosts.propTypes = {
  posts: array.isRequired
};
