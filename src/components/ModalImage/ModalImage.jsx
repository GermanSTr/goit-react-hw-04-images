import { Loader } from 'components/Loader/Loader';
import React, { Component } from 'react';
import { Modal, Overlay } from 'styled';

export class ModalImage extends Component {
  state = {
    imageLoaded: false,
  };

  handleImageLoad = () => {
    this.setState({ imageLoaded: true });
  };
  handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.handleCloseModal();
    }
  };

  handleKeyPress = evt => {
    if (evt.code === 'Escape') {
      this.props.handleCloseModal();
    }
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    const { imageLoaded } = this.state;

    return (
      <Overlay onClick={this.handleOverlayClick}>
        {imageLoaded ? null : <Loader />}
        <Modal>
          <img
            src={this.props.modalData.largeImageURL}
            alt={this.props.modalData.tags}
            onLoad={this.handleImageLoad}
          />
        </Modal>
      </Overlay>
    );
  }
}
