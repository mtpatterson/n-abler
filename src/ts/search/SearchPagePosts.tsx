import * as React from 'react';
import { Fragment } from 'react';
import { Post } from '../types';
import { normalizeUrl, parseHTML } from '../utils';

interface SearchPagePostsProps {
  posts: Post[];
}

function SearchPagePosts({ posts }: SearchPagePostsProps): JSX.Element {
  return (
    <Fragment>
      {posts.map((post: Post) => {
        const { id, slug, title, _embedded = false } = post;

        return (
          <a className="na-card card text-dark" href={slug} key={id}>
            {/* show image only if image exists */}
            {_embedded['wp:featuredmedia'] && (
              <img
                className="na-card-img-top"
                src={normalizeUrl(_embedded['wp:featuredmedia'])}
                alt={parseHTML(title.rendered)}
              />
            )}
            <div className="card-body">
              <div>{parseHTML(title.rendered)}</div>
            </div>
          </a>
        );
      })}
    </Fragment>
  );
}

export default SearchPagePosts;
