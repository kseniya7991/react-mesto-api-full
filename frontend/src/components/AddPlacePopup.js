import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  //Сброс формы при открытии попапа
  useEffect(() => {
    setLink('');
    setTitle('');
  }, [isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    //Передаем данные новой карточки на сервер для отрисовки
    onAddPlace({ title, link });
  }

  function handleInputTitle(e) {
    setTitle(e.target.value);
  }

  function handleInputCardLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonValue="Создать"
      onSubmit={handleSubmit}
    >
      <section className="popup__input-section">
        <input
          className="popup__input popup__input_text_title"
          id="add-title"
          name="Title"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="40"
          required
          onChange={handleInputTitle}
          value={title}
        />
        <span className="popup__input-error" id="add-title-error"></span>
      </section>
      <section className="popup__input-section">
        <input
          className="popup__input popup__input_link_photo"
          id="add-link"
          name="Link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          onChange={handleInputCardLink}
          value={link}
        />
        <span className="popup__input-error" id="add-link-error"></span>
      </section>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
