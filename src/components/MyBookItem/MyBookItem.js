import React from 'react';
import styles from './MyBookItem.module.scss';
import { NavLink } from 'react-router-dom';

class MyBookItem extends React.Component{

    state = {
        bookName: '',
        bookImageUrl: ''
    }

    componentDidMount = async () => {
        await fetch('http://localhost:4000/books/'+this.props.bookId)
        .then(response => response.json())
        .then(json => this.setState({
            bookName: json.book.name,
            bookImageUrl: json.book.bookImageUrl
        }))
    }

    render(){
        return(
            <div className={styles.wrapper}>
                <img src={this.state.bookImageUrl} alt={this.props.bookId} /> 
                <NavLink className={styles.bookName} to={'../../book/'+this.props.bookId}>{this.state.bookName}</NavLink>
                <button className={styles.returnBookBtn} onClick={()=>this.props.returnBookFn(this.props.physicalBookId)}>Oddaj książkę</button>
            </div>
        )
    }
}


export default MyBookItem;