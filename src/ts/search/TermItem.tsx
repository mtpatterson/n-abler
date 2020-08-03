import * as React from 'react';
import { useState } from 'react';

interface TermItemProps {
  name: string;
  count: number;
  index: number;
  handleFilterByTerm: () => void;
}

function TermItem({
  name,
  count,
  index,
  handleFilterByTerm
}: TermItemProps): JSX.Element {
  const [isActive, setActive] = useState<boolean>(false);

  return (
    <div className="my-1 mx-0">
      <button
        onClick={() => {
          setActive(!isActive);
          handleFilterByTerm();
        }}
        className={
          'na-btn-term btn btn-link text-dark' + (isActive ? ' active' : '')
        }
        data-testid={index === 0 && 'term-category-item'}
      >
        <span>{name}</span> <span>({count})</span>
      </button>
    </div>
  );
}

export default TermItem;
