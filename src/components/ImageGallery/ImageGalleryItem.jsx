import React from 'react';
import { ImageItem } from 'styled';

export const ImageGalleryItem = ({
  webFormat,
  alt,
  largeImageURL,
  handleSelectedImage,
}) => {
  return (
    <ImageItem>
      <img
        onClick={() => handleSelectedImage(largeImageURL, alt)}
        src={webFormat}
        alt={alt}
      />
    </ImageItem>
  );
};
