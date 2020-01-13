import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink, withRouter } from 'react-router-dom';
import styles from './Searchbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBookItem from '../SearchBookItem/SearchBookItem';

class Searchbar extends React.Component{

    state = {
        searchResultVisible: false,
        searchInputDraft: '',
        books: [],
    }

    componentDidMount() {
        console.log(window.location.pathname)
        this.setState({searchInputDraft: this.props.searchInput})
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);
    
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                searchResultVisible: false,
                
            });
        }
    }

    changeSearchDraft = (e) => {
        this.setState({books: []})
        this.setState({searchInputDraft: e.target.value});
        fetch('http://localhost:4000/books/book/'+e.target.value)
        .then(response => response.json())
        .then(json => {
            if(Array.isArray(json)){
                if(json.length>0){
                    this.setState({
                        books: json,
                        searchResultVisible: true,
                    })
                }else{
                    this.setState({
                        searchResultVisible: false,
                    })
                }
            }else{
                this.setState({
                    books: [],
                    searchResultVisible: false,
                })
            }
        })
    }

    openResultView = () => {
        if(this.state.books.length>0){
            this.setState({searchResultVisible: true});
        }
    }

    render(){
        return(
            <div className={styles.wrapper} >
                <input 
                    value={this.state.searchInputDraft || ''}
                    autoComplete='off'
                    onClick={this.openResultView} 
                    onChange={this.changeSearchDraft} 
                    type='text' name='search' placeholder='Wyszukaj książkę'/>

                <NavLink 
                        to={'/search/book/'+this.state.searchInputDraft}
                        // to={window.location.pathname}
                        onClick={()=>this.setState({searchResultVisible: false})}>
                    <FontAwesomeIcon
                    className={styles.searchBtn} icon="search" size="1x" />
                </NavLink>

                {this.state.searchResultVisible && 
                    <div className={styles.founded}>
                        {/* <button onClick={()=>console.log('search ...')}>szukaj</button> */}
                        <ul>
                            {this.state.books.map(book => <li><SearchBookItem key={book._id} book={book}/></li>)}
                        </ul>
                        
                    </div>
                }

            </div>
        )
    }
}

export default Searchbar;