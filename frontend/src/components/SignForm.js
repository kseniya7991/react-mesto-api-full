import React from 'react';
import { Link } from 'react-router-dom';

function SignForm({ name, title, buttonValue, onSubmit, onChangeEmail, onChangePassword, onShowPassword, email, password, isVisiblePassword}) {
  return (
    <section className="sign">
      <form className="popup__form popup__form_sign" name={name} onSubmit={onSubmit}>
        <div>
          <h2 className="popup__title popup__title_sign">{title}</h2>
          <section className="popup__input-section">
            <input
              className="popup__input popup__input_sign"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={onChangeEmail}
              value={email}
            />
            <section className="popup__input_password">
            <input
              className="popup__input popup__input_sign"
              id="password"
              name="password"
              type={`${isVisiblePassword ? 'text' : 'password'}`}
              placeholder="Пароль"
              required
              onChange={onChangePassword}
              value={password}
            />
            <button 
              className={`password_unvisible ${isVisiblePassword ? 'password_unvisible_off' : ''}`}
              onClick={onShowPassword}
              type="button"
            />
            </section>
          </section>
        </div>
        <div>
          <button
            type="submit"
            formTarget="_self"
            className="popup__save-button popup__save-button_sign"
            value={buttonValue}
          >
            {buttonValue}
          </button>
          <p className={`sign__text ${name === 'Login' ? ' sign__text_disabled' : ''} `}>
            {`${name === 'Login' ? 'Еще не зарегистрированы?' : 'Уже зарегистрированы?'}`}
            <Link className="sign__link" to={`${name === 'Login' ? '/sign-up' : '/sign-in'}`}>
            {`${name === 'Login' ? 'Регистрация' : 'Войти'}`}
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default SignForm;
