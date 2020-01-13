import React from 'react';
import styles from './Reviews.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GetUserName from '../GetName/GetUserName';


class Reviews extends React.Component {
    state = {
        authors: []
    }
    componentDidMount = () => {
        
    }

    render(){
        const { review } = this.props;
        return(
            <div className={styles.wrapper}>
                

                <div className={styles.reviewHeader}>               

                    <div className={styles.authorWrapper}>
                        <p><GetUserName userId={review.userId} /> </p> 
                    </div>
             
                    <div className={styles.gradeWrapper}>
                        <p className={styles.rating}>Ocena: <strong>{review.grade} / 5</strong></p>
                    </div>
                    
                </div>
                <div className={styles.review}>
                    <p>{review.review}</p>
                </div>
                
            </div>
        )
    }
  
}

export default Reviews;