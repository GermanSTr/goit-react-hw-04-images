import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from '../service/image-app';
import { STATUSES } from 'utils/constans';
import { Loader } from './Loader/Loader';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { AppDiv } from 'styled';
import { ModalImage } from './ModalImage/ModalImage';

export class App extends Component {
  state = {
    query: '',
    status: STATUSES.idle,
    page: 1,
    images: [],
    error: null,
    isLoadMore: false,
    randomID: 0,
    isOpenModal: false,
    modalData: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page, randomID } = this.state;
    if (
      prevState.query !== query ||
      prevState.page !== page ||
      prevState.randomID !== randomID
    ) {
      this.answerImagesByQuery(query, page);
    }
  }

  onSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      isLoadMore: false,
      randomID: Math.random(),
    });
  };

  answerImagesByQuery = async (query, page) => {
    try {
      this.setState({ status: STATUSES.pending });
      const { hits, total } = await getImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isLoadMore: page < Math.ceil(total / 12),
        status: STATUSES.success,
      }));
    } catch (error) {
      this.setState({ error: error.message, status: STATUSES.error });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSelectedImage = (largeImageURL, alt) => {
    this.setState({
      isOpenModal: true,
      modalData: { largeImageURL, alt },
    });
  };

  handleCloseModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const { images, status, error, isLoadMore, isOpenModal, modalData } =
      this.state;
    const showImageGallery = status === STATUSES.success && images.length === 0;

    return (
      <AppDiv>
        <Searchbar onSubmit={this.onSubmit} />
        {status === STATUSES.pending && <Loader />}
        {status === STATUSES.error && <ErrorMessage error={error} />}
        {showImageGallery && <p>No image found...</p>}
        {!!images.length && (
          <ImageGallery
            images={images}
            handleSelectedImage={this.handleSelectedImage}
          />
        )}
        {isLoadMore && <LoadMoreBtn handleLoadMore={this.handleLoadMore} />}
        {isOpenModal && (
          <ModalImage
            modalData={modalData}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </AppDiv>
    );
  }
}
