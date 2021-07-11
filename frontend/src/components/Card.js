import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDeleteBtn }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDeleteBtn(card);
  }

  //Определяем, является ли текущий пользователь владельцем карточки
  const isOwn = card.owner === currentUser._id;

  //Класс для отображения корзинки удаления карточки
  const cardDeleteButtonClassName = `photo__delete ${isOwn ? '' : 'photo__delete_inactive'}`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((userId) => userId === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photo__like ${isLiked ? 'photo__like_active' : ''}`;
  return (
    <li className="photo">
      <img className="photo__img" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="photo__description">
        <h2 className="photo__title">{card.name}</h2>
        <div className="photo__like-wrapper">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="like"
            onClick={handleLikeClick}
          ></button>
          <span className="photo__like-counter">{card.likes.length}</span>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="delete"
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
export default Card;
