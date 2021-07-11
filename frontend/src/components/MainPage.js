import React, { useEffect, useState } from 'react';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import api from '../utils/api';

import CurrentUserContext from '../contexts/CurrentUserContext';
import CardsContext from '../contexts/CardsContext';

function MainPage() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData.user);
        setCards(cardsData.reverse().map((card) => ({ card })));
      })
      .catch((err) => console.log(err));
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});

  function handleConfirmPopupClick(card) {
    setIsConfirmDeleteOpen(true);
    setSelectedDeleteCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeleteOpen(false);
    setSelectedCard({});
    setSelectedDeleteCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(name, about) {
    return  api
      .sendUser(name, about)
      .then((userData) => setCurrentUser(userData.user))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    return api
      .updateAvatar(avatar)
      .then((userData) => setCurrentUser(userData.user))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
  }

  //Обработка лайка карточки

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((cardUserId) => cardUserId === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => (c.card._id === card._id ? { card: newCard } : c)));
      })
      .catch((err) => console.log(err));
  }

  //Обработка удаления карточки

  function handleCardDeleteBtn() {
    return api
      .removeCard(selectedDeleteCard._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c.card._id !== selectedDeleteCard._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(addedCard) {
    return api
      .addCard(addedCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div>
            <Main
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDeleteBtn={handleConfirmPopupClick}
              />

              <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />

              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />

              <ConfirmDeletePopup
                isOpen={isConfirmDeleteOpen}
                onClose={closeAllPopups}
                onCardDeleteBtn={handleCardDeleteBtn}
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
          
         </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default MainPage;
