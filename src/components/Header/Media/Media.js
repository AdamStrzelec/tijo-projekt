import React from 'react';
import styles from './Media.module.scss';
import MediaItem from './MediaItem';
import { faFacebookSquare, faTwitterSquare, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons"

const Media = () => (
    <ul className={styles.wrapper}>
        <MediaItem icon={faTwitterSquare} link="/dan_abramov" fullLink="https://twitter.com/dan_abramov"/>
        <MediaItem icon={faFacebookSquare} link="/zuck" fullLink="https://pl-pl.facebook.com/zuck"/>
        <MediaItem icon={faYoutubeSquare} link="/abstrachujetv" fullLink="https://www.youtube.com/user/AbstrachujeTV"/>
    </ul>
)

export default Media;