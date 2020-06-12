import React from 'react';
import ReactDOM from 'react-dom';
import { array } from 'prop-types';

function SearchPage({ searchResults }) {
  return (
    <div>
      {searchResults.map(({ id, thumbnail, title }) => {
        return (
          <div key={id}>
            <p>{title}</p>
            <img src={thumbnail ? thumbnail : '/'} alt="" />
          </div>
        );
      })}
    </div>
  );
}

SearchPage.propTypes = {
  searchResults: array.isRequired
};

export function initSearchPage(searchResults) {
  const search = document.querySelector('.js-search-page');

  ReactDOM.render(<SearchPage searchResults={searchResults} />, search);
}
