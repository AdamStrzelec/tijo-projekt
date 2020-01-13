import React from 'react';
import styles from './SearchBookView.module.scss';
import Searchbar from '../../components/Searchbar/Searchbar';
import BookItem from '../../components/BookItem/BookItem';

class SearchBookView extends React.Component{

    state = {
        books: [],
        foundedBooksQuantity: 0,
        bookName: '',
    }

    componentDidMount = () =>{
        this.fetchInfo();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.fetchInfo();
        }
      }

    fetchInfo = () => {
        fetch('http://localhost:4000/books/book/'+this.props.match.params.name)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({books: json,
                            foundedBooksQuantity: json.length});
        })
    }

    render(){
        const { books } = this.state;

        return(
            <div>
                <Searchbar 
                    searchInput={this.props.match.params.name}/>
                    <p className={styles.booksQuantity}>
                    {this.state.foundedBooksQuantity>0
                    ? 'Znaleziono '  + this.state.foundedBooksQuantity + ' książek'
                    : 'Brak rezultatów'}
                    
                </p>
                <div>                
                    {books.map(book => <BookItem key={book.id} book={book} />)}
                </div>
            </div>
        )
    }
}

export default SearchBookView;