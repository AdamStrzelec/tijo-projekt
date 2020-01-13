import React from 'react';

class BookItemAuthor extends React.Component {
    state = {
        author: '',
    }
    componentDidMount = () => {
        fetch('http://localhost:4000/authors/'+this.props.authorId)
        .then(response => response.json())
        .then(json => this.setState({author: json.authorName}))
    }

    render(){

        return(
            <>
                {this.state.author}
            </>
        )
    }
}
export default BookItemAuthor;