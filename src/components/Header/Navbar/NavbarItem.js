import React from 'react';
import styles from './NavbarItem.module.scss';
import { NavLink } from 'react-router-dom';

const NavbarItem = ({link,navhref}) => (
    <li className={styles.wrapper}>
    <NavLink to={navhref}>{link}</NavLink>
    </li>
    
)

export default NavbarItem;