import { useEffect, useState } from 'react';

import { AppDiv } from 'styled';

import { STATUSES } from 'utils/constans';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from '../service/image-app';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { ModalImage } from './ModalImage/ModalImage';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(STATUSES.idle);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [randomID, setRandomID] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (query === '' && page === 1 && randomID === 0) return;

    const answerImagesByQuery = async () => {
      try {
        setStatus(STATUSES.pending);
        const { hits, total } = await getImages(query, page);
        setImages(prevState => [...prevState, ...hits]);
        setIsLoadMore(page < Math.ceil(total / 12));
        setStatus(STATUSES.success);
      } catch (error) {
        setError(error.message);
        setStatus(STATUSES.error);
      }
    };
    answerImagesByQuery(page, query);
  }, [page, query, randomID]);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setIsLoadMore(false);
    setRandomID(Math.random());
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSelectedImage = (largeImageURL, alt) => {
    setIsOpenModal(true);
    setModalData({ largeImageURL, alt });
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const showImageGallery = status === STATUSES.success && images.length === 0;
  return (
    <AppDiv>
      <Searchbar onSubmit={onSubmit} />
      {status === STATUSES.pending && <Loader />}
      {status === STATUSES.error && <ErrorMessage error={error} />}
      {showImageGallery && <p>No image found...</p>}
      {!!images.length && (
        <ImageGallery
          images={images}
          handleSelectedImage={handleSelectedImage}
        />
      )}
      {isLoadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
      {isOpenModal && (
        <ModalImage modalData={modalData} handleCloseModal={handleCloseModal} />
      )}
    </AppDiv>
  );
};
