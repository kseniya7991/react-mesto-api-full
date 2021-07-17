import React, { useState } from 'react';
import SignForm from './SignForm';

function Login({ onLogin }) {
  const name = 'Login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  //Отправка логина и пароля на сервер при нажатии кнопки "войти"
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  //Обновление стейт-переменных логина и пароля при изменении инпутов
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChenge(e) {
    setPassword(e.target.value);
  }

  // Отображение пароля
  function handleShowpassword(e) {
    setIsVisiblePassword(!isVisiblePassword)
  }

  return (
    <SignForm
      name={name}
      title="Вход"
      buttonValue="Войти"
      onChangeEmail={handleEmailChange}
      onChangePassword={handlePasswordChenge}
      onSubmit={handleSubmit}
      onShowPassword={handleShowpassword}
      email={email}
      password={password}
      isVisiblePassword={isVisiblePassword}
    />
  );
}

export default Login;
