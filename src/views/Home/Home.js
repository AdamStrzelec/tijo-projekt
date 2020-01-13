import React from 'react';
import BookItem from '../../components/BookItem/BookItem';
import './Home.css';
import Searchbar from '../../components/Searchbar/Searchbar';
import * as bookItemsApi from '../../helpers/booksApi';




class Home extends React.Component{

    state = {
        books: []
    }

    componentDidMount = async () => {
        const booksJson = await bookItemsApi.getAllBooks();
        this.setState ({books: booksJson.books})
    }
    render(){
        const { books } = this.state;
       
       

        return(
            <div className="homeWrapper">
            <Searchbar />
            <div className="items">                
                {books.map(book => <BookItem key={book.id} book={book} />)}
            </div>
            </div>
        )
    }
};

export default Home;