import React from 'react';
import styles from './Header.module.scss';
import Carousel from './Carousel/Carousel';
import Media from './Media/Media';
import Navbar from './Navbar/Navbar';

const Header = () => {
    return(
        <header className={styles.header} >
            <Carousel nextImageInterval={9}/>
            <Media />
            <Navbar />        
        </header>
    )
}

export default Header;