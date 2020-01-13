import React from 'react';
import AppContext from '../../context';
import BookItem from '../../components/BookItem/BookItem';
import './Book.css';
import * as api from '../../helpers/booksApi';
import BookInfo from '../../components/BookInfo/BookInfo';
import Reviews from '../../components/Reviews/Reviews';
import ModalInput from '../../components/Modal/ModalInput';
import { NavLink } from 'react-router-dom';



class Book extends React.Component {

    state = {
        book: {},
        // authors: [],
        reviews: [],
        isModalOpen: false,
        grade: 0,
        review: '',
        averageGrade: 0,
        reviewsCount: 0
        // books: {
        //     description: '',
        //     authors: [''],
        //     id: '/'
        // },
        // filter: this.props.match.params.id

    }
    fetchInfo = async () => {
        const bookJson = await api.getBookById(this.props.match.params.id);
        const reviewsJson = await api.getReviewsByBookId(this.props.match.params.id);
        
        // const authors = [];
        this.setState({book: bookJson.book})
        this.setState({reviews: reviewsJson.reviews})
        const averegeGradeJson = await fetch('http://localhost:4000/reviews/averageGrade/'+this.props.match.params.id)
                                        .then(response => response.json())
        this.setState({averageGrade: averegeGradeJson.averageGrade})
        this.setState({reviewsCount: averegeGradeJson.reviewsCount})

    }
    componentDidMount = () => {
        // const bookJson = await api.getBookById(this.props.match.params.id);
        // const reviewsJson = await api.getReviewsByBookId(this.props.match.params.id);
        this.fetchInfo();
        // const authors = [];
        // this.setState({book: bookJson.book})
        // this.setState({reviews: reviewsJson.reviews})
        // await bookJson.book.authors.map(async author=>{  
        //     const authorJson = await api.getAuthorById(author.authorId);
        //     authors.push(authorJson);
        // })
        // await this.setState({authors: authors});
        
    }

    submit = async (userType, user, context) => {
        
        // preventDefault();
        if(userType==='logged'){
            console.log('user id: '+user._id+' book id: '+this.props.match.params.id);
            if(this.state.grade>0 && this.state.review.length>0){
                console.log('zgadza sie')
                const response = await fetch('http://localhost:4000/reviews',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    bookId: this.props.match.params.id,
                    grade: this.state.grade,
                    review: this.state.review
                })})
                .then(result => {
                    if(result.status===201){
                        console.log('dodano opinie')
                        this.fetchInfo();
                    }else if(result.status===409){
                        context.openInfoModal('Możesz dodać tylko raz opinię dla danej książki');
                    }else{
                        console.log('błąd')
                    }
                })
            }else{
                console.log('nie zgadza sie')
                context.openInfoModal('Wypełnij wszystkie pola');
            }
        }else{
            console.log('musisz być zalogowany aby dodać ocenę');
            context.openInfoModal('Musisz być zalogowany aby dodać ocenę');
        }
        
        console.log(userType)
    }
    setGrade = (e) => {
        this.setState({grade: e.target.value})
    }
    setReview = (e) => {
        this.setState({review: e.target.value})
    }
    render() {
        const  reviews  = this.state.reviews;
        // console.log(reviews)
        // onSubmit={this.submit}
        // const { book } = this.state;
        // console.log(book);
        //console.log(reviews)
        return (
            <AppContext.Consumer>
                {(context)=>(
                <>
                <div className="bookWrapper">
                    <BookInfo averageGrade={this.state.averageGrade} reviewsCount={this.state.reviewsCount} bookId={this.props.match.params.id}/>
                </div>
                <div className="addReviewWrapper">
                    <h2>Dodaj ocenę</h2>
                    
                        
                        <ModalInput type='number' name='grade' label='Ocena' setValue={this.setGrade}/>
                        <ModalInput tag='textarea' name='review' label='Opinia' setValue={this.setReview}/>

                        <button onClick={() => this.submit(context.userType, context.user, context)} className="addReviewBtn">Dodaj ocenę</button>
                        {/* {context.user.userType==='admin'?
                                <NavLink to={'/edit/book/'+this.props.match.params.id}>Edytuj książkę</NavLink>: <p></p>
                                } */}
                        {/* {context.userType === 'logged' && context.user.userType==='admin' 
                        ?<button >
                            <NavLink to={'edit/book/'+this.props.match.params.id}>Edytuj</NavLink>
                        </button>
                        : <button >
                        Wypożycz
                        </button>} */}
                       

                </div>
                <div>
                {reviews.map(review => <Reviews key={review.id} review={review} />)}
                </div>
                </>
                )}
            </AppContext.Consumer>

        )
    }
};

export default Book;