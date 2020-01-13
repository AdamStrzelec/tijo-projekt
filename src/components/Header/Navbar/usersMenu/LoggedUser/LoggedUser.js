import React from 'react';
import styles from './LoggedUser.module.scss';
import AppContext from '../../../../../context';
// import LoggedUserPanel from '../LoggedUserPanel/LoggedUserPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LoggedUser extends React.Component{
    // state = {
    //     userMenuIsOpen: false,
    // }

    changeUserMenuState = () => {
        this.setState({userMenuIsOpen: !this.state.userMenuIsOpen});
    }

    render(){
        const {userName, userType} = this.props;
        return(
            <AppContext.Consumer>
                {context => (
                <div className={styles.userMenu}>
                    <div className={styles.wrapper} onClick={context.userMenuSwitch}>
                        <p className={styles.userName}>{userName}</p>
                        <div className={styles.arrowIcon}>
                            <FontAwesomeIcon icon="sort-down" />
                        </div>
                        <div className={styles.userIcon}>
                            {userType==='user'?
                                <FontAwesomeIcon icon="user" size="2x" />
                            : <FontAwesomeIcon icon="user-cog" size="2x" />}
                        </div>  
                    </div>
                </div>
                )}
            </AppContext.Consumer>




        )
    }
}



export default LoggedUser;