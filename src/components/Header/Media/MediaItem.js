import React from 'react';
import styles from './MediaItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MediaItem = ({icon, link, fullLink}) => (
    <li className={styles.wrapper}>
        <a className={styles.icon} href={fullLink} target="_blank" rel="noopener noreferrer">
            <div className={styles.top}><FontAwesomeIcon icon={icon} size="3x" /></div>
            <p className={styles.link}>{link}</p>
            <div className={styles.bottom}><FontAwesomeIcon icon={icon} size="3x" /></div>
        </a>
    </li>
)
export default MediaItem;