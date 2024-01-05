import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Modal, Overlay } from 'styled';

export const ModalImage = ({ handleCloseModal, modalData }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyPress = evt => {
      if (evt.code === 'Escape') {
        handleCloseModal();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleCloseModal]);

  return (
    <Overlay onClick={handleOverlayClick}>
      {imageLoaded ? null : <Loader />}
      <Modal>
        <img
          src={modalData.largeImageURL}
          alt={modalData.tags}
          onLoad={handleImageLoad}
        />
      </Modal>
    </Overlay>
  );
};
