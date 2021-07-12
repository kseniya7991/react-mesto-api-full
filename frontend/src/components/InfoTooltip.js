import React from 'react';

function InfoTooltip({ isOpen, onClose, status, message }) {
  function handleOverlayClick(e) {
    if (e.target.classList.contains('popup_opened')) {
      onClose();
    }
  }
  console.log(status, message)

  return (
    <section className={`popup popup_info ${isOpen ? ' popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__form popup__form_info">
        <button type="reset" className="popup-close" aria-label="close" onClick={onClose}></button>
        <div className={`${status ? 'popup__success' : 'popup__error'}`}></div>
        <p className="popup__title popup__title_info">{status ? "Вы успешно зарегистрировались!" : message}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;
