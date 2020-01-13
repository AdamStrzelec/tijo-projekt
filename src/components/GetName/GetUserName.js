import React from 'react';



class GetUserName extends React.Component{

    state = {
        userName: '',
    }

    componentDidMount = () => {
        fetch('http://localhost:4000/users/name/'+this.props.userId)
        .then(response => response.json())
        .then(json => this.setState({userName: json.userName}))
    }

    render(){
        return(
            <>{this.state.userName}</>
        )
    }
}
    

export default GetUserName;