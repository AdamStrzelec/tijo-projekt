import React from 'react';
import styles from './LoggedUserPanel.module.scss';
import AppContext from '../../context';
import { NavLink } from 'react-router-dom';


class LoggedUserPanel extends React.Component{


    render(){
        return(
            <AppContext.Consumer>
                {context => (
                <div className={styles.wrapper} >
                    <ul>
                        <li><NavLink to={'/user/'+context.user._id}>Moje Konto</NavLink></li>
                        <li>
                            {context.user.userType==='admin'?
                                <NavLink to={'/add/book'}>Dodak książkę</NavLink>:
                                <NavLink to={'/mybooks/'+context.user._id}>Moje książki</NavLink>}
                        </li>
                        <li>
                            <button onClick={context.logoutFn}>
                                Wyloguj się
                            </button>
                        </li>
                    </ul>

                </div>
                )}
            </AppContext.Consumer>

        )
    }
}

export default LoggedUserPanel;