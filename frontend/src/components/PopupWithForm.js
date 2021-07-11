import React, { useEffect } from 'react';
import keyClose from '../utils/constants';

function PopupWithForm({ title, name, children, isOpen, onClose, buttonValue, onSubmit }) {
  function handleOverlayClick(e) {
    if (e.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  useEffect(() => {
    function handleEscClick(e) {
      if (e.key === keyClose) onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscClick);
    }
    return () => document.removeEventListener('keydown', handleEscClick);
  }, [isOpen, onClose]);

  return (
    <section
      className={`popup popup_${name} ${isOpen ? ' popup_opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <form className={`popup__form popup__form_${name}`} name={name} onSubmit={onSubmit}>
        <button type="reset" className="popup-close" aria-label="close" onClick={onClose}></button>
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        {children}
        <button
          type="submit"
          formTarget="_self"
          className={`popup__save-button popup__save-button_${name}`}
          aria-label="save"
          value={buttonValue}
        >
          {buttonValue}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
