import React from 'react';
import AppContext from '../../context';
import styles from './BookInfo.module.scss';
import * as api from '../../helpers/booksApi';
import BookItemAuthor from '../BookItem/BookItemAuthor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

class BookInfo extends React.Component {

    state = {
        book: {},
        bookInfoFetched: false,
    }

    componentDidMount = async () => {
        const bookJson = await api.getBookById(this.props.bookId);
        this.setState({book: bookJson.book})
        this.setState({bookInfoFetched: true});
        // console.log(this.state.book);
    }
    rentBook = (context, book) => {
        if(context.userType==='logged'){
            context.openRentBookModal(book.name, book.price, book._id)
        }else{
            context.openInfoModal('Musisz być zalogowany aby móc wypożyczyć książkę');
        }
        // console.log(book._id)
    }
    render(){
        const { book } = this.state;
        return(
        <AppContext.Consumer>
            {context =>(
            <div className={styles.wrapper}>
                <div className={styles.mainInfoContainer}>

                    <div className={styles.bookImage}>
                        <img src={book.bookImageUrl} alt={book._id}/>
                    </div>

                    <div className={styles.mainInfo}>
                        <div className={styles.bookName}>
                            <h2 className={styles.bookNameHeader}>{book.name}</h2>
                        </div>
                        <div className={styles.authorsWrapper}>
                            <h2>{this.state.bookInfoFetched && this.state.book.authors.length>1 ? 'Autorzy:' : 'Autor:'}</h2>
                            <ul>
                                {this.state.bookInfoFetched && this.state.book.authors.map((author) => 
                                <li>{<BookItemAuthor key={author.authorId} authorId={author.authorId} />}</li>)}
                            </ul>
                        </div>
                        <div className={styles.additionalInfo}>
                            <p>Średnia ocena: <strong>{this.props.averageGrade} / 5</strong></p>
                            <p>Ilość ocen: <strong>{this.props.reviewsCount}</strong></p>
                            {/* <button className={styles.addGradeButton}>Dodaj ocenę</button> */}
                        </div>
                    </div>

                    <div className={styles.rentInfo}>
                        {/* <button className={styles.addToShoppingCartButton}>
                            Dodaj do koszyka <FontAwesomeIcon icon="shopping-cart" size="1x" />
                        </button>
                        <button className={styles.rentNowButton}>Wypożycz teraz</button> */}
                        {context.userType === 'logged' && context.user.userType==='admin' 
                                ?
                                    <NavLink className={styles.edit} to={'../edit/book/'+this.props.bookId}>Edytuj</NavLink>
                                
                                : <button className={styles.rentNowButton} onClick={()=>this.rentBook(context, book)}>
                                Wypożycz <FontAwesomeIcon icon="shopping-cart" size="1x" />
                                </button>}
                        <div className={styles.additionalInfo}>
                            <p>Cena: <strong>{book.price} zł</strong></p>
                            <p>Ilość sztuk: <strong>TO DO</strong></p>
                        </div>
                    </div>
                </div>
                <div className={styles.bookDescription}>
                    <h2>Opis:</h2>
                    <p>{book.description}</p>
                </div>
            </div> 
            )}
        </AppContext.Consumer>

        )
    }
  
}

export default BookInfo;