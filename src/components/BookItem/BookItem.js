import React from 'react';
import AppContext from '../../context';
import styles from './BookItem.module.scss';
import BookItemAuthor from './BookItemAuthor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';




let bookDescriptionLimit = (description) => {
    
    if (description.length > 250) {
        return description.substring(0, 250) + '...'
    }
    return description
}

let getAuthorNameById = (authorId) => {
    fetch('http://localhost:4000/authors/' + authorId)
        .then(response => response.json())
        .then(json => console.log(json.authorName))
}

class BookItem extends React.Component {
    state = {
        authors: [],
        availableBooksQuantity: 0,
    }

    componentDidMount = () => {
        //     let authorsArray = []
        //    for(let i=0; i<this.props.book.authors.length; i++){
        //     authorsArray.push(getAuthorNameById(this.props.book.authors[i]))
        //    } 
        //    console.log(authorsArray + " arr")
        // console.log(this.props.book.authors.length)
        fetch('http://localhost:4000/physicalBooks/availableCount/'+this.props.book.id)
        .then(response => response.json())
        .then(json => this.setState({availableBooksQuantity: json.physicalBooksCount}))
        // console.log(this.props.book.id)

    }
    rentBook = (context, book) => {
        if(context.userType==='unlogged'){
            context.openInfoModal('Musisz być zalogowany aby móc wypożyczyć książkę')
        }
        if(context.userType==='logged' && context.user.userType==='user'){
            // console.log('pożycz');
            if(this.state.availableBooksQuantity===0){
                context.openInfoModal('Brak dostępnych książek do wypożyczenia');
            }else{
                context.openRentBookModal(book.name, book.price, this.props.book.id);
            }
        }
    }
    render() {
        const { book } = this.props;
        return (
            <AppContext.Consumer>
                {context => (
                    <div className={styles.wrapper}>
                        <div className={styles.bookItemImage}>
                            <img src={book.bookImageUrl} alt={`book item ${book.id}`} />
                        </div>
        
                        <div className={styles.bookInfo}>
        
        
                            <NavLink className={styles.bookName} to={'book/'+book.id}>{book.name}</NavLink>
        
                            <div className={styles.descriptionWrapper}>
                                <p className={styles.description}>{bookDescriptionLimit(book.description, this.props.full)}</p>
                            </div>
        
                            <div className={styles.authorWrapper}>
                                {book.authors.map(author => <div className={styles.author} 
                                    key={author.author}><BookItemAuthor authorId={author.author} /></div>)}
                            </div>
                            {/* <h3 className={styles.author}>{book.author}</h3> */}
        
                            <p className={styles.rating}>Ocena: {book.averageGrade} / 5</p>
                        </div>
        
                        <div>
                            {context.userType === 'logged' && context.user.userType==='admin' 
                                ?<button className={styles.editBook}>
                                    <NavLink className={styles.edit} to={'edit/book/'+book.id}>Edytuj</NavLink>
                                </button>
                                : <button className={styles.addBook} onClick={()=>this.rentBook(context, book)}>
                                Wypożycz <FontAwesomeIcon icon="shopping-cart" size="1x" />
                                </button>}
                            <p>Ilość: <strong>{this.state.availableBooksQuantity}</strong></p>
                            <p>cena: <strong>{book.price} zł</strong></p>
                        </div>
                    </div>
                )}
            </AppContext.Consumer>


        )

    }

}

export default BookItem;