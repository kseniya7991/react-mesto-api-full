import React, { useEffect } from 'react';
import keyClose from '../utils/constants';

function ImagePopup({ selectedCard, onClose }) {
  function handleOverlayClick(e) {
    if (e.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  useEffect(() => {
    function handleEscClick(e) {
      if (e.key === keyClose) onClose();
    }

    if (Object.entries(selectedCard).length) {
      document.addEventListener('keydown', handleEscClick);
    }
    return () => document.removeEventListener('keydown', handleEscClick);
  }, [onClose, selectedCard]);

  return (
    <section
      className={`popup popup_photo ${
        Object.entries(selectedCard).length !== 0 ? ' popup_opened' : ''
      }`}
      onClick={handleOverlayClick}
    >
      <figure className="popup__photo-block">
        <button
          type="reset"
          className="popup-close popup-close_card"
          aria-label="close"
          onClick={onClose}
        ></button>
        <img
          className="popup__photo"
          src={selectedCard ? selectedCard.link : '#'}
          alt={selectedCard.name}
        />
        <figcaption className="popup__caption">{selectedCard.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
