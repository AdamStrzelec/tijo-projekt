import React from 'react';
import styles from './UnloggedUserMenu.module.scss';

const UnloggedUserMenu = ({openLoginModalFn, openRegisterModalFn}) => (
    <div className={styles.wrapper}>
        <button className={styles.loginButton} onClick={openLoginModalFn}>Logowanie</button>
        <button className={styles.registerButton} onClick={openRegisterModalFn}>Rejestracja</button>
    </div>
)
export default UnloggedUserMenu;