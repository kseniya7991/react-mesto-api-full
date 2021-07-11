import React from 'react';
import { Link } from 'react-router-dom';

function HeaderSignOut({ onSignOut }) {
  
  function handleSignOutClick() {
    onSignOut();
  }

  return (
    <Link className={`header__link`} to="" onClick={handleSignOutClick}>
      Выйти
    </Link>
  );
}

export default HeaderSignOut;
