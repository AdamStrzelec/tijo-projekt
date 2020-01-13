import React from 'react';
import styles from './CarouselImage.module.scss';

const CarouselImage = ({image, imgNumber, currentImgNumber}) => {
    return(
        <div className={styles.carouselImageWrapper}>
                <img className={styles.image} style={imgNumber===currentImgNumber ?{opacity: 1}:{opacity:0}} src={image} alt={'image number'+imgNumber}/> 
        </div>
    )
}

export default CarouselImage;