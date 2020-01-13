import React from 'react';
import AppContext from '../../context';
import styles from './Modal.module.scss';
import ModalInput from './ModalInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as api from '../../helpers/usersApi';

class Modal extends React.Component {

    state = {
        user: {},
        userDataFetched: false,
        message: null
    }
    componentDidMount(){
       
    }
    userLogin = async (body) => {
        const response = await fetch('http://localhost:4000/users/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)})
        .then(result => {
            if(result.status===200){
                this.setState({userDataFetched: true});
                return result.json();
            }else if(result.status===404){
                this.setState({message: 'Nieprawidłowa nazwa użytkownika lub hasło',
                                userDataFetched: false});
                return 'Nieprawidłowa nazwa użytkownika lub hasło'
            }
            this.setState({userDataFetched: false});
            return 'Błąd';
            
        })
        if(this.state.userDataFetched){
            this.setState({user: response.user,
                            message: 'Zalogowano poprawnie'})
            this.props.changeUserFn(this.state.user);
        }

    }
    userRegister = async (body, repeatPassword) =>{
        if(body.password===repeatPassword){
            const response = await fetch('http://localhost:4000/users/signup',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)})
                .then(result => {
                    if(result.status===201){
                        this.setState({userDataFetched: true});
                        return result.json();
                    }else if(result.status===409){
                        this.setState({message: 'Użytkownik o danym loginie lub E-mailu już istnieje',
                                        userDataFetched: false});
                        return 'Użytkownik i danym loginie lub E-mailu już istnieje'
                    }
                    this.setState({userDataFetched: false});
                    return 'Błąd';
                    
                })
                if(this.state.userDataFetched){
                    this.setState({user: response.user,
                                    message: 'Utworzono użytkownika'})
                    this.props.changeUserFn(this.state.user);
                }
        }else{
            this.setState({message: 'Pola hasło i powtórz hasło muszą być takie same'})
        }
    }
    submitForm = (e) => {
        e.preventDefault();
        if(this.props.modalType==='login'){
            this.userLogin({
                login: e.target[0].value,
                password: e.target[1].value
                })
        }else if(this.props.modalType==='register'){
            this.userRegister({
                login: e.target[0].value,
                password: e.target[8].value,
                name: e.target[1].value,
                lastName: e.target[2].value,
                email: e.target[3].value,
                place: e.target[5].value,
                street: e.target[6].value,
                homeNumber: e.target[7].value,
                phoneNumber: e.target[4].value
            },e.target[9].value)
        }

    }
    displayModalByType = (context, modalType, closeModalFn) => {
        
            if(modalType==='login' || modalType==='register'){
                if(!this.state.userDataFetched){
                    return this.displayForm(modalType);
                }else{
                    return (
                    <div className={styles.infoModal}>
                        <h2 className={styles.modalInfoMessage}>{this.state.message}</h2>
                        <button className={styles.confirmButton} onClick={closeModalFn}>OK</button>
                    </div>
                    )
                } 
            }else if(modalType==='info'){
                return (
                    <div className={styles.infoModal}>
                        <h2 className={styles.modalInfoMessage}>{this.props.modalInfo}</h2>
                        <button className={styles.confirmButton} onClick={closeModalFn}>OK</button>
                    </div>
                )
            }else if(modalType==='rentBook'){
                return (
                    <div className={styles.infoModal}>
                        <h2 className={styles.modalInfoMessage}>tytuł: <strong>{this.props.modalRentBookName}</strong></h2>
                        <h2 className={styles.modalInfoMessage}>cena: <strong>{this.props.modalRentBookPrice} zł</strong></h2>
                        <button className={styles.confirmButton} onClick={()=>this.rentBook(context, closeModalFn)}>Wypożycz</button>
                        <button className={styles.cancelButton} onClick={closeModalFn}>Anuluj</button>
                    </div>
                )
            }
        
    }
    rentBook = (context, closeModalFn) =>{
        // closeModalFn();
        console.log(this.props.modalRentBookId);
        console.log(this.props.user._id);
        fetch('http://localhost:4000/transactions/rentBook',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: this.props.user._id,
                bookId: this.props.modalRentBookId
            })})
            .then(result => {
                if(result.status===409){
                    context.openInfoModal('Możesz posiadać tylko jeden egzemplarz tej książki');
                }
            })
        closeModalFn();
    }
    displayForm(modalType){
        return(
            <form autoComplete="off" onSubmit={this.submitForm}>
                <h2 className={styles.modalTitle}>{modalType === 'login' ? 'Logowanie' : 'Rejestracja'}</h2>
                <ModalInput type='text' name='userName' label='Nazwa użytkownika'/>
                {modalType === 'register' && <ModalInput type='text' name='firstName' label='Imię'/>}
                {modalType === 'register' && <ModalInput type='text' name='lastName' label='Nazwisko'/>}
                {modalType === 'register' && <ModalInput type='text' name='email' label='Adres e-mail'/>}
                {modalType === 'register' && <ModalInput type='number' name='phoneNumber' label='Numer telefonu'/>}
                {modalType === 'register' && <ModalInput type='text' name='place' label='Miejscowość'/>}
                {modalType === 'register' && <div className={styles.address}>
                        <div className={styles.street}><ModalInput className={styles.street} type='text' name='street' label='Ulica'/></div>
                        <div className={styles.homeNumber}><ModalInput type='number' name='homeNumber' label='Numer'/></div>
                    </div>}
                <ModalInput type='password' name='userPassword' label='Hasło użytkownika'/>
                {modalType === 'register' && <ModalInput type='password' name='userPasswordRepeat' label='Powtórz hasło'/>}
                {this.state.message!=null && !this.state.userDataFetched && <p>{this.state.message}</p>}
                <button type="submit" className={styles.submitButton}>{modalType==='login' ? 'Zaloguj się' : 'Zarejestruj się'}</button>
            </form>
        )
    }
    render(){
        const {closeModalFn, modalType} = this.props;
        return(
            <AppContext.Consumer>
                {context =>(
                    <div className={styles.modalBackground}>
                    <div className={styles.modalWindow}>
                        <button className={styles.closeModalButton} onClick={closeModalFn}><FontAwesomeIcon icon="times" size="2x" /></button>
                            {/* {this.props.modalType!=='info' ? !this.state.userDataFetched ?
                                    this.displayForm(modalType):
                                    <div className={styles.infoModal}>
                                        <h2 className={styles.modalInfoMessage}>{this.state.message}</h2>
                                        <button className={styles.confirmButton} onClick={closeModalFn}>OK</button>
                                    </div>
                                    : <div className={styles.infoModal}>
                                        <h2 className={styles.modalInfoMessage}>{this.props.modalInfo}</h2>
                                        <button className={styles.confirmButton} onClick={closeModalFn}>OK</button>
                                    </div>} */}
                            {this.displayModalByType(context, modalType, closeModalFn)}
                        </div>
                    </div>
                )}
            </AppContext.Consumer>

        )    
    }
}

export default Modal;