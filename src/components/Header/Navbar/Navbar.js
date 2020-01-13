import React from 'react';
import styles from './Navbar.module.scss';
import AppContext from '../../../context';
import NavbarItem from './NavbarItem';
import UnloggedUserMenu from './usersMenu/UnloggedUserMenu/UnloggedUserMenu';
import LoggedUser from './usersMenu/LoggedUser/LoggedUser';
// import ReactDOM from 'react-dom';

const navbarItems = [
    'HOME',
    'O NAS',
    'TOP 10',
    'KONTAKT',
];
const navbarLink =[
    '/',
    '/about',
    '/top',
    '/contact',
]

class Navbar extends React.Component{
    componentDidMount = () => {
        // var n = ReactDOM.findDOMNode(this);
        // console.log(n.offsetTop);
      };
    render(){

        return(
            <AppContext.Consumer>
                            

            {(context)=>(
                
                <div className={styles.wrapper} >
                    <div className={styles.navbar}>
                        <ul>
                            <NavbarItem link={navbarItems[0]} navhref={navbarLink[0]} />
                            <NavbarItem link={navbarItems[1]} navhref={navbarLink[1]}  />
                            <NavbarItem link={navbarItems[2]} navhref={navbarLink[2]} />
                            <NavbarItem link={navbarItems[3]} navhref={navbarLink[3]} />
                        </ul>
                    </div>
                    <div className={styles.userMenu}>
                        {context.userType==='logged' ? 
                            <LoggedUser userName={context.user.name} userType={context.user.userType}/>:
                            <UnloggedUserMenu
                            openLoginModalFn={context.openLoginModal}
                            openRegisterModalFn={context.openRegisterModal}/>
                        }
                    </div>
                    
                </div>
            )}
            
        </AppContext.Consumer>
        )
    }
}
export default Navbar;