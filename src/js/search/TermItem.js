import React, { useState } from 'react';
import { number, string, func } from 'prop-types';

function TermItem({ name, count, index, handleFilterByTerm }) {
  const [isActive, setActive] = useState(false);

  return (
    <div className="my-1 mx-0">
      <button
        data-testid={index === 0 && 'term-category-item'}
        onClick={() => {
          setActive(!isActive);
          handleFilterByTerm();
        }}
        className={
          'na-btn-term btn btn-link text-dark' + (isActive ? ' active' : '')
        }
      >
        <span>{name}</span> <span>({count})</span>
      </button>
    </div>
  );
}

TermItem.propTypes = {
  name: string.isRequired,
  count: number.isRequired,
  index: number.isRequired,
  handleFilterByTerm: func.isRequired
};

export default TermItem;
