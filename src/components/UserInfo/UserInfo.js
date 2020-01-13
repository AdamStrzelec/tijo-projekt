import React from 'react';
import AppContext from '../../context';
import styles from './UserInfo.module.scss';
import UserEditInput from './UserEditInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as api from '../../helpers/usersApi';

class UserInfo extends React.Component {

    state = {
        user: {},
        userDataFetched: false,
        message: null,
        
    }
    componentDidMount = async () => {
       
        
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    userEdit = async (body, repeatPassword,id) => {
       
        if (body.password === repeatPassword) {
            const response = await fetch('http://localhost:4000/users/edit/5defa0b4b37bfb570c9a5008'+id,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)})
                .then(result => {
                    if (result.status === 201) {
                        this.setState({ userDataFetched: true });
                        return result.json();
                    } else if (result.status === 409) {
                        this.setState({
                            message: 'Użytkownik o danym loginie lub E-mailu już istnieje',
                            userDataFetched: false
                        });
                        return 'Użytkownik i danym loginie lub E-mailu już istnieje'
                    }
                    this.setState({ userDataFetched: false });
                    return 'Błąd';

                })
        if (this.state.userDataFetched) {
            this.setState({
                user: response.user,
                message: 'Utworzono użytkownika'
            })
            
        }
    }else{
    this.setState({ message: 'Pola hasło i powtórz hasło muszą być takie same' })
}
    }
submitForm = (e) => {
    e.preventDefault();

    this.userEdit({
        login: e.target[0].value,
        password: e.target[8].value,
        name: e.target[1].value,
        lastName: e.target[2].value,
        email: e.target[3].value,
        place: e.target[5].value,
        street: e.target[6].value,
        homeNumber: e.target[7].value,
        phoneNumber: e.target[4].value
    }, e.target[9].value,e.target[0].id)
  

    
}

render(){
   
    return (
        <AppContext.Consumer>
              {(context)=>(
                  
            <form autoComplete="off" onSubmit={this.submitForm}>
                <h2 className={styles.modalTitle}>Edycja</h2>
                <div>
                    <label>login</label>
                <UserEditInput type='text' name='userName' id={context.user._id}  value={context.user.login}  />
                </div>
                <div>
                <label>Imię</label>
                <UserEditInput type='text' name='firstName'  value={context.user.name} />
                </div>
                <div>
                <label>Nazwisko</label>
                <UserEditInput type='text' name='lastName'  value={context.user.lastName} />
                </div>
                <div>
                <label>email</label>
                <UserEditInput type='text' name='email'  value={context.user.email} />
                </div>
                <div>
                <label>numer telefonu</label>
                <UserEditInput type='number' name='phoneNumber'  value={context.user.phoneNumber} />
                </div>
                <div>
                <label>miasto</label>
                <UserEditInput type='text' name='place'  value={context.user.place} />
                </div>
                <div>
                <div className={styles.address}>
                <label>ulica</label>
                    <div className={styles.street}><UserEditInput className={styles.street} type='text' name='street' value={context.user.street} /></div>
                    <label>numer domu</label>
                    <div className={styles.homeNumber}><UserEditInput type='number' name='homeNumber'  value={context.user.homeNumber} /></div>
                </div>
                </div>
                <div>
                <label>hasło</label>
                <UserEditInput type='password' name='userPassword'  value={context.user.password} />
                </div>
                <div>
                <label>Powtórz hasło</label>
                <UserEditInput type='password' name='userPasswordRepeat'  value={context.user.password} />
                </div>

                {this.state.message != null && !this.state.userDataFetched && <p>{this.state.message}</p>}
                <button type="submit" className={styles.submitButton}>Edytuj</button>
            </form>
             )}
        </AppContext.Consumer>

    )
}
}

export default UserInfo;