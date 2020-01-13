import React from 'react';
import AppContext from '../../context';
import styles from './MyBooks.module.scss';
import MyBookItem from '../../components/MyBookItem/MyBookItem';

class MyBooks extends React.Component{

    state = {
        physicalBooks: [],
    }

    componentDidMount = () => {
        console.log('user id: '+this.props.match.params.userId);
        this.getPhysicalBooks();
    }

    getPhysicalBooks(){
        fetch('http://localhost:4000/physicalBooks/userBooks/'+this.props.match.params.userId)
        .then(response => response.json())
        .then(json => this.setState({physicalBooks: json}))
    }

    returnBook = async (physicalBookId) => {
        const book = {
            userId: this.props.match.params.userId,
            physicalBookId: physicalBookId
        }
        console.log(book);
        await fetch('http://localhost:4000/transactions/returnBook',{
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)})
                .then(resutl => {
                    if(resutl.status===200){
                        this.getPhysicalBooks();
                    }
                })

    }

    render(){
        return(
            <AppContext.Consumer>
                {context => (
                    
                    <div className={styles.wrapper}>
                        <h2 className={styles.header}>Moje książki</h2>
                            {context.userType==='logged'&& 
                                <div>
                                    {this.state.physicalBooks.map(physicalBook => 
                                        <MyBookItem 
                                            bookId={physicalBook.bookId} 
                                            physicalBookId={physicalBook.physicalBookId}
                                            returnBookFn={this.returnBook}/>
                                    )}
                                </div>
                            }
                            

                        


                    </div>
                )}
            </AppContext.Consumer>

        )
    }
}

export default MyBooks;