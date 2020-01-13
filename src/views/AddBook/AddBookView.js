import React from 'react';
import AppContext from '../../context';
import ModalInput from '../../components/Modal/ModalInput';
import styles from './AddBookView.module.scss';
import * as api from '../../helpers/booksApi';

class AddBookView extends React.Component {
    
    state = {
        bookNameDraft: '',
        imgUrlDraft: '',
        descriptionDraft: '',
        priceDraft: '',
        authorNameDraft: '',
        newAuthorDraft: '',
        addedAuhors: [],
        foundedAuthors: [],
        authorFocused: false,
        physicalBooksQuantity: 0,
        physicalBooksQuantityInData: 0,
        bookAdded: false,
    }

    componentDidMount = async () => {
        if(this.props.match.params.id){
            const authors = [];
            console.log('edit')
            const bookJson = await api.getBookById(this.props.match.params.id);
            for(let i=0; i<bookJson.book.authors.length; i++){
                console.log(bookJson.book.authors[i].authorId)
                await fetch('http://localhost:4000/authors/fullAuthorData/'+bookJson.book.authors[i].authorId)
                        .then(response => response.json())
                        .then(json => authors.push(json))
            }
            const booksCountJson = await fetch('http://localhost:4000/physicalBooks/availableCount/'+this.props.match.params.id)
                                            .then(response => response.json())
                                            .then(json => this.setState({physicalBooksQuantity: json.physicalBooksCount,
                                                                        physicalBooksQuantityInData: json.physicalBooksCount}))
            console.log(bookJson)
            console.log(authors);
            
            this.setState({bookNameDraft: bookJson.book.name,
                            imgUrlDraft: bookJson.book.bookImageUrl,
                            descriptionDraft: bookJson.book.description,
                            priceDraft: bookJson.book.price,
                            addedAuhors: authors})
        }else{
            console.log('add')
        }
        
        
        
    }
    changeBookDraftProperty = (e, name) => {
        this.setState({[name]: e.target.value})
    }

    findAuthors = (e) => {
        fetch('http://localhost:4000/authors/author/'+e.target.value)
        .then(response => response.json())
        .then(json => {
            this.setState({foundedAuthors: json})
        })
        .catch(err => console.log(err))
    }

    addAuthor = (author) => {
        let authors = this.state.addedAuhors;
        authors.push(author);
        authors = authors.filter((thing, index, self) =>
            index === self.findIndex((t) => (
            t._id === thing._id
        ))
        )
        this.setState({addedAuhors: authors});
    }
    removeAuthor = (author) => {
        let authors = this.state.addedAuhors;
        let index = authors.findIndex(a => a._id === author._id)
        authors.splice(index, 1);
        this.setState({addedAuhors: authors});
    }

    addBook = async (context) => {
        // console.log('add book')
        let id=this.props.match.params.id;
        let fetchLink='';
        let postOrPut='';
     

        if(this.props.match.params.id){
            fetchLink='http://localhost:4000/books/'+id
            postOrPut='PUT'
            console.log('edit book')
            // const bookJson = await api.getBookById(this.props.match.params.id);
            // console.log(bookJson);
        }else{
            fetchLink='http://localhost:4000/books';
            postOrPut='POST';
            console.log('add book')
       }
        
        const authorsId = [];
        for(let i=0; i<this.state.addedAuhors.length; i++){
            authorsId.push({authorId: this.state.addedAuhors[i]._id});
        }

        const { physicalBooksQuantityInData, physicalBooksQuantity } = this.state;
        let booksToDelete = 0;
        let booksToAdd = 0;
        if(physicalBooksQuantity>physicalBooksQuantityInData){booksToAdd = physicalBooksQuantity-physicalBooksQuantityInData}
        else{booksToDelete = physicalBooksQuantityInData-physicalBooksQuantity}
        const book = {
            name: this.state.bookNameDraft,
            bookImageUrl: this.state.imgUrlDraft,
            description: this.state.descriptionDraft,
            price: this.state.priceDraft,
            authors: authorsId,
            addBooksQuatity: booksToAdd,
            deleteBooksQuantity: booksToDelete,
        }
        console.log(book)
        if(this.addBookIsFilled()){
            const response = await fetch(fetchLink,{
                method: postOrPut,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)})
                .then(result => {
                    if(result.status===201){
                        // this.setState({userDataFetched: true});
                        // return result.json();
                        console.log('dodano książkę');
                        // return 'dodano ksiazke';
                        // this.changeBooksQuantityInData();
                        // this.setState({bookAdded: true});
                        {this.props.match.params.id 
                            ? context.openInfoModal('Książka została zmieniona')
                            : context.openInfoModal('Książka została dodana')
                        }
                        
                    }                    
                })
                // if(this.state.bookAdded){this.changeBooksQuantityInData()}
                // console.log(response)
        }else{
            context.openInfoModal('Musisz wypełnić wszystkie pola aby dodać książkę');
        }
    }
    addAuthorToData = async (context) => {
        if(this.state.newAuthorDraft.length>0){
            await fetch('http://localhost:4000/authors',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({authorName: this.state.newAuthorDraft})})
                .then(result => {
                    if(result.status===201){
                        console.log('Dodano autora');
                    }
                })
            context.openInfoModal('Dodano autora');
        }else{
            context.openInfoModal('To pole jest puste');
        }

    }
    addBookIsFilled = () => {
        const { bookNameDraft, imgUrlDraft, descriptionDraft, priceDraft, addedAuhors } = this.state;
        return bookNameDraft.length > 0 && imgUrlDraft.length > 0 && descriptionDraft.length > 0 && priceDraft > 0 && addedAuhors.length > 0;
    }

    render(){
        return(
            <AppContext.Consumer>
                {context => (
                    <div className={styles.wrapper}>
                    <h2 className={styles.header}>Dodaj książkę</h2>
                    <ModalInput type='text' name='book name' label='Nazwa książki' value={this.state.bookNameDraft || ''} setValue={(e) => this.changeBookDraftProperty(e, 'bookNameDraft')} />
                    <ModalInput type='text' name='img url' label='Adres obrazka' value={this.state.imgUrlDraft || ''} setValue={(e) => this.changeBookDraftProperty(e, 'imgUrlDraft')} />
                    <ModalInput tag='textarea' type='text' name='description' value={this.state.descriptionDraft || ''} label='Opis' maxLength={500} setValue={(e) => this.changeBookDraftProperty(e, 'descriptionDraft')} />
                    <ModalInput type='number' name='price' label='Cena' value={this.state.priceDraft || ''} setValue={(e) => this.changeBookDraftProperty(e, 'priceDraft')} />
                    <div className={styles.author} >
                        <div className={styles.searchAuthor} id='searchAuthor'>
                            <ModalInput type='text' name='author name' label='Nazwa autora' id='authorInput' setValue={(e) => this.findAuthors(e)}  />
                            {this.state.foundedAuthors.length>0 && Array.isArray(this.state.foundedAuthors) && 
                                <div className={styles.foundedAuthorsActive}>
                                    <ul className={styles.authors}>
                                        {this.state.foundedAuthors.map(author => 
                                            <li key={author._id} onClick={()=>this.addAuthor(author)}>{author.authorName}</li>
                                        )}
                                    </ul>
                                </div>}
                        </div>
                        <div className={styles.addedAuthors} >
                            <ul>
                                {this.state.addedAuhors.map(author => <li key={author._id}>{author.authorName} <span onClick={()=>this.removeAuthor(author)}>X</span></li>)}
                            </ul>
                        </div>
                        <div className={styles.booksQuantity}>
                            <p>
                                Ilość dostępnych sztuk:
                            </p>
                            <p>
                                <span>{this.state.physicalBooksQuantity}</span>
                            </p>
                            <div className={styles.booksQuantitySwitch}>
                                <button onClick={() => 
                                    {this.setState({physicalBooksQuantity: this.state.physicalBooksQuantity+1})}}>+</button>
                                <button onClick={() => 
                                    {this.state.physicalBooksQuantity>0 && this.setState({physicalBooksQuantity: this.state.physicalBooksQuantity-1})}}>-</button>
                            </div>
                        </div>
                        <button className={styles.addBookButton} onClick={()=>this.addBook(context)}>{this.props.match.params.id ? 'Edytuj książkę' : 'Dodaj książkę'}</button>
                        {/* <div className={styles.addAuthor}>
                            <h2 className={styles.header}>Dodaj Autora</h2>
                            <div className={styles.addAuthorInput}>
                                <ModalInput name='newAuthor' label='Doda autora' setValue={(e) => this.changeBookDraftProperty(e, 'newAuthorDraft')} />
                                <button className={styles.addBookButton} onClick={this.addAuthor}>Dodaj</button>
                            </div>
                        </div> */}
                    </div>
                    <h2 className={styles.header}>Dodaj Autora</h2>
                    <div className={styles.addAuthor}>
                        <ModalInput name='newAuthor' label='Nazwa autora' value={this.state.newAuthorDraft || ''} setValue={(e) => this.changeBookDraftProperty(e, 'newAuthorDraft')} />
                        <button className={styles.addBookButton} onClick={()=>this.addAuthorToData(context)}>Dodaj</button>
                    </div>
                </div>
                )}
            </AppContext.Consumer>

        )
    }
}

export default AddBookView;