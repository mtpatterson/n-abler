import React from 'react';
import { array } from 'prop-types';
import { normalizeUrl } from '../utils';

export default function SearchPagePosts({ posts }) {
  return posts.map(({ id, slug, title, _embedded = false }) => {
    return (
      <a className="na-card card text-dark" href={slug} key={id}>
        {/* show image only if image exists */}
        {_embedded['wp:featuredmedia'] && (
          <img
            className="card-img-top na-card-img-top"
            src={normalizeUrl(_embedded['wp:featuredmedia'])}
            alt={title && title.rendered}
          />
        )}
        <div className="na-card-body">
          <p className="card-title">{title && title.rendered}</p>
        </div>
      </a>
    );
  });
}

SearchPagePosts.propTypes = {
  posts: array.isRequired
};
