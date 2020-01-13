import React from 'react';
import styles from './Carousel.module.scss';
import image1 from '../../../assets/images/carousel1.jpg';
import image2 from '../../../assets/images/carousel2.jpg';
import image3 from '../../../assets/images/carousel3.jpg';
import image4 from '../../../assets/images/carousel4.jpg';
import image5 from '../../../assets/images/carousel5.jpg';
import CarouselImage from './CarouselImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Carousel extends React.Component{
    state = {
        currentImageNumber: 1,
        nextImageInterval: this.props.nextImageInterval,
        currentCount: this.props.nextImageInterval,
        images: [
            image1,
            image2,
            image3,
            image4,
            image5
        ],
    }
    timer() {
        this.setState({
            currentCount: this.state.currentCount - 1
        })
        if(this.state.currentCount < 1) { 
            this.nextImage();
        }
    }    
    prevImage = () => {
        let prevImgNumber;
        {this.state.currentImageNumber>1 ? 
            prevImgNumber = this.state.currentImageNumber-1 :
            prevImgNumber=5}
        this.setState({currentImageNumber: prevImgNumber})
        this.setState({currentCount: this.state.nextImageInterval})
    }
    nextImage = () => {
        let nextImgNumber;
        {this.state.currentImageNumber<5 ? 
            nextImgNumber = this.state.currentImageNumber+1 :
            nextImgNumber=1}
        this.setState({currentImageNumber: nextImgNumber})
        this.setState({currentCount: this.state.nextImageInterval})
    }
    componentDidMount(){
        this.setState({currentImageNumber: Math.floor((Math.random() * 5) + 1)})
        this.intervalId = setInterval(this.timer.bind(this), 1000);
    }
    render(){
        const images = this.state.images.map((image, index) =>
            <CarouselImage key={index} image={image} imgNumber={index+1} currentImgNumber={this.state.currentImageNumber}/>
        )
        const prevImageIcon = <FontAwesomeIcon icon="arrow-alt-circle-left" size="3x" />
        const nextImageIcon = <FontAwesomeIcon icon="arrow-alt-circle-right" size="3x" />
        return(
            <div className={styles.wrapper}>
                {images}
                <div className={styles.switchButtonPrev} onClick={this.prevImage}>
                    {prevImageIcon}
                </div>
                <div className={styles.switchButtonNext} onClick={this.nextImage}>
                    {nextImageIcon}
                </div>   
            </div>
        )
    }
}

export default Carousel;