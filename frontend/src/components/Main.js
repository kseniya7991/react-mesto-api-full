import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import addButton from '../images/__add-button.svg';
import Card from './Card';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDeleteBtn,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="user">
          <div className="user-photo" onClick={onEditAvatar}>
            <img
              className="user__avatar"
              src={currentUser.avatar}
              alt="фото пользователя"
              title="фото пользователя"
            />
          </div>
          <div className="user__profile-info">
            <div className="user__name-block">
              <h1 className="user__name">{currentUser.name}</h1>
              <button
                className="user__edit-button"
                type="submit"
                aria-label="edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="user__about">{currentUser.about}</p>
          </div>
        </div>

        <button className="add-button" type="button" onClick={onAddPlace}>
          <img src={addButton} className="add-button__image" alt="кнопка" title="кнопка" />
        </button>
      </section>

      <section className="photo-tape">
        <div className="photos-grid">
          {cards.map(({ ...card }) => (
           <Card
              key={card._id}
              {...card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeleteBtn={onCardDeleteBtn}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
