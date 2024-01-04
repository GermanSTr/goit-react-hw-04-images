import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageGalleryList } from 'styled';

export const ImageGallery = ({ images, handleSelectedImage }) => {
  return (
    <ImageGalleryList>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webFormat={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          handleSelectedImage={handleSelectedImage}
        />
      ))}
    </ImageGalleryList>
  );
};
