import React from 'react';
import AppContext from '../../context';
import UserInfo from '../../components/UserInfo/UserInfo'

class User extends React.Component {
    componentDidMount = async () => {
        
        // await bookJson.book.authors.map(async author=>{  
        //     const authorJson = await api.getAuthorById(author.authorId);
        //     authors.push(authorJson);
        // })
        // await this.setState({authors: authors});
        
    }
    render() {
       
        return (
           <UserInfo></UserInfo>

        )


    }
}




export default User