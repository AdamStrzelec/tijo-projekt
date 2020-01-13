import React from 'react';
import styles from './UserEditInput.module.scss';

class UserEdit extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            type:this.props.type,
            value:this.props.value,
            name:this.props.name,
            
            
    
        }
     
            this.handleChange = this.handleChange.bind(this);

        
    }
   
    handleChange(event) {
        if(this.state.name== "userName"){

        }
        else if(this.state.name =="email"){
            
        }
        else{
        this.setState({value: event.target.value});
        }
      }


 
    render(){
      
        return(
            <div className={styles.wrapper}>
            <input
                value={this.state.value}
                type={this.state.type}
                name={this.state.name}
                required
                onChange={this.handleChange}
            />
          
        </div>
        )
    }
}


export default UserEdit;