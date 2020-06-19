import React from 'react';
import { number, string, func } from 'prop-types';

function TermItem({ name, count, slug, onClick }) {
  return (
    <div className="my-1 mx-0">
      <button
        onClick={() => onClick(slug)}
        className="btn btn-link text-dark px-0"
      >
        <span>{name}</span> <span>({count})</span>
      </button>
    </div>
  );
}

TermItem.propTypes = {
  name: string.isRequired,
  count: number.isRequired,
  slug: string.isRequired,
  onClick: func.isRequired
};

export default TermItem;
