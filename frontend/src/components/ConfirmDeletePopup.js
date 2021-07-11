import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ isOpen, onClose, onCardDeleteBtn }) {

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        //Передаем информацию об удалении карточки на сервер
        onCardDeleteBtn()
    }

    return (
        <PopupWithForm name="delete-card" title="Вы уверены?" isOpen={isOpen} onClose={onClose} buttonValue="Да" onSubmit={handleSubmit}>
        </PopupWithForm>
    );
}
export default ConfirmDeletePopup;
