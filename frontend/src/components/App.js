import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProectedRoute';
import InfoTooltip from './InfoTooltip';
import HeaderSignOut from './HeaderSignOut';

import { useHistory } from 'react-router';

import MainPage from './MainPage';
import * as auth from '../utils/auth';
import Main from './Main';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [statusInfoPopup, setStatusInfoPopup] = useState(false);
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [history, loggedIn]);

  function closeInfoPopup() {
    if (statusInfoPopup) {
      setIsInfoPopupOpen(false);
      history.push('/sign-in');
    } else {
      setIsInfoPopupOpen(false);
    }
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          const { email } = res.user;
          setUserEmail(email);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSubmitRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.message) {
          setMessage(res.message);
          setStatusInfoPopup(false);
          setIsInfoPopupOpen(true);
        } else {
          setStatusInfoPopup(true);
          setIsInfoPopupOpen(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleSubmitLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.message) {
          setMessage(res.message);
          setStatusInfoPopup(false);
          setIsInfoPopupOpen(true);
        }
        if (res.token) {
          setLoggedIn(true);
          history.push('/');
          setUserEmail(email);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
  }

  return (
    <div>
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        onClose={closeInfoPopup}
        status={statusInfoPopup}
        message={message}
      />

      <Switch>
        <Header email={userEmail} isLogged={loggedIn}>
          <Route path="/sign-up">
            <Link to="/sign-in" className={`header__link`}>
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className={`header__link`}>
              Регистрация
            </Link>
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={HeaderSignOut}
            onSignOut={handleSignOut}
          />
        </Header>
      </Switch>

      <Switch>
        <Route path="/sign-up">
          <Register onRegister={handleSubmitRegister} />
        </Route>
        <Route path="/sign-in">
          <Login onLogin={handleSubmitLogin} />
        </Route>
        <ProtectedRoute path="/" loggedIn={loggedIn} component={MainPage} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
