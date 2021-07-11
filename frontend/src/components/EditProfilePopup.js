import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleInputNameChange(e) {
    setName(e.target.value);
  }

  function handleInputAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({ name, about });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonValue="Сохранить"
      onSubmit={handleSubmit}
    >
      <section className="popup__input-section">
        <input
          className="popup__input popup__input_text_name"
          id="profile-name"
          name="name"
          type="text"
          placeholder={'Ваше имя'}
          value={name || ''}
          minLength="2"
          maxLength="40"
          required
          onChange={handleInputNameChange}
        />
        <span className="popup__input-error" id="profile-name-error"></span>
      </section>
      <section className="popup__input-section">
        <input
          className="popup__input popup__input_text_about"
          id="profile-about"
          name="about"
          type="text"
          placeholder="Чем вы занимаетесь"
          value={about || ''}
          minLength="2"
          maxLength="200"
          required
          onChange={handleInputAboutChange}
        />
        <span className="popup__input-error" id="profile-about-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
