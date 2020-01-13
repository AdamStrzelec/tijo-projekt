import React from 'react';
import './App.css';
import AppContext from '../../context';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faArrowAltCircleLeft, faArrowAltCircleRight, faUser, faUserCog, faSortDown, faTimes, faShoppingCart, faSearch} from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from '../About/About';
import Home from '../Home/Home';
import Contact from '../Contact/Contact';
import Top from '../Top/Top';
import Book from '../Book/Book';
import User from '../User/User'
import MyBooks from '../MyBooks/MyBooks';
import LoggedUserPanel from '../../components/LoggedUserPanel/LoggedUserPanel';
import AddBookView from '../AddBook/AddBookView';
import SearchBookView from '../SearchBook/SearchBook';
// import AddBookView from '../'


library.add(faArrowAltCircleLeft, faArrowAltCircleRight, faUser, faUserCog, faSortDown, faTimes, faShoppingCart, faSearch)

const modalTypes = {
  login: 'login',
  register: 'register',
  info: 'info',
  rentBook: 'rentBook',
}

class App extends React.Component {
  state = {
    user: {},
    userType: 'unlogged',
    userBooks: {},
    isModalOpen: false,
    isUserMenuOpen: false,
    modalType: modalTypes.login,
    modalInfoMessage: '',
    rentModalBookName: '',
    rentModalBookPrice: '',
    rentModalBookId: '',
  }
  closeModal = () => {
    this.setState({isModalOpen: false})
  }
  openLoginModal = () => {
    this.setState({
      modalType: modalTypes.login,
      isModalOpen: true
    })
  }
  openRegisterModal = () => {
    this.setState({
      modalType: modalTypes.register,
      isModalOpen: true
    })
  }
  openRentBookModal = (bookName, price, bookId) => {
    this.setState({
      modalType: modalTypes.rentBook,
      isModalOpen: true,
      rentModalBookName: bookName,
      rentModalBookPrice: price,
      rentModalBookId: bookId,
    })
    

  }
  openInfoModal = (message) => {
    this.setState({
      modalType: modalTypes.info,
      isModalOpen: true,
      modalInfoMessage: message
    })
  }
  userMenuSwitch = () =>{
    let { isUserMenuOpen } = this.state;
    this.setState({isUserMenuOpen: !isUserMenuOpen});
  }
  logoutFn = () => {
    this.setState({user: {}, userType: 'unlogged', isUserMenuOpen: false});
  }
  changeUser = (user) => {
    // this.setState({user: user,
    //                 userType: 'logged'})
    // console.log('xDDDD')
    // console.log(user)
    
    this.setState({user: user,
                  userType: 'logged'})
  }
  getUserBooks = (books) => {
    this.setState({userBooks: books});
  }
  render(){
    const contextElements = {
      ...this.state,
      getUserBooks: this.getUserBooks,
      openLoginModal: this.openLoginModal,
      openRegisterModal: this.openRegisterModal,
      openInfoModal: this.openInfoModal,
      openRentBookModal: this.openRentBookModal,
      changeUser: this.changeUser,
      userMenuSwitch: this.userMenuSwitch,
      logoutFn: this.logoutFn,
    }
    return (
      <BrowserRouter>
      <div className="App">
        <AppContext.Provider value={contextElements}>
          <Header />
          <Switch>
          <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/top" component={Top} />
            <Route path="/contact" component={Contact} />
            <Route path="/book/:id" component={Book}/>
            <Route path="/add/book" component={AddBookView}/>
            <Route path="/user/:id" component={User}/>
            <Route path="/edit/book/:id" component={AddBookView}/>
            <Route path="/mybooks/:userId" component={MyBooks}/>
            <Route path="/search/book/:name" component={SearchBookView}/>
          </Switch>
          {this.state.isModalOpen && <Modal 
          closeModalFn={this.closeModal} 
          changeUserFn={this.changeUser} 
          modalType={this.state.modalType} 
          modalInfo={this.state.modalInfoMessage}
          modalRentBookName={this.state.rentModalBookName}
          modalRentBookPrice={this.state.rentModalBookPrice}
          modalRentBookId={this.state.rentModalBookId}
          user={this.state.user}/>}
          {this.state.isUserMenuOpen && <LoggedUserPanel /> }
        </AppContext.Provider>
      </div>
      </BrowserRouter>

    );
  }
}

export default App;
