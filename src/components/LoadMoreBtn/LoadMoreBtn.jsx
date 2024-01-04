import React from 'react';
import { LoadMoreButton } from 'styled';

const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <LoadMoreButton onClick={handleLoadMore} type="button">
      Load more
    </LoadMoreButton>
  );
};

export { LoadMoreBtn };
