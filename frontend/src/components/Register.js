import React, { useState } from 'react';
import SignForm from './SignForm';

function Register({ onRegister }) {
  const name = 'Register';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Отправка логина и пароля на сервер при нажатии кнопки "зарегистрироваться"
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  //Обновление стейт-переменных логина и пароля при изменении инпутов
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChenge(e) {
    setPassword(e.target.value);
  }

  return (
    <SignForm
      name={name}
      title="Регистрация"
      buttonValue="Зарегистрироваться"
      onSubmit={handleSubmit}
      onChangeEmail={handleEmailChange}
      onChangePassword={handlePasswordChenge}
      email={email}
      password={password}
    />
  );
}

export default Register;
