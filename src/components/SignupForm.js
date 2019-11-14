import React, { PureComponent } from 'react';
import '../styles.css';

class SignupForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        formData: {
            username: '',
            password: '',
        },
        checked: false,
        usernameEmpty: true,
        passwordEmpty: true,
        counterA: 0,
        submited: false
      };
        
    }
  
    handleInput = (event) => {

        // hide error message if value is not empty
        if (event.target.value) {
            if(event.target.name === 'username') {
                this.setState({
                    usernameEmpty: false
                })
            }
            if(event.target.name === 'password') {
                this.setState({
                    passwordEmpty: false
                })
            }
        }

        // if everything from input is deleted, to display the error message
        else {
            if(event.target.name === 'username') {
                this.setState({
                    usernameEmpty: true
                })
            }
            if(event.target.name === 'password') {
                this.setState({
                    passwordEmpty: true
                })
            }
        }
        
        let formData = Object.assign({}, this.state.formData);
        formData[event.target.name] = event.target.value;
        this.setState({
          formData
        })

    }
  
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submited: true
        })
        
    }

    handleCheckbox = (event) => {
        this.setState({
            checked: event.target.checked
        })
    }
  
    render() {
    const {checked, usernameEmpty, passwordEmpty} = this.state;
      return (
        <div>
        {this.state.counterA !== 60 && !this.state.submited && <div>
        <h2>You are exactly {this.state.counterA} seconds on this page</h2>
        <form onSubmit={this.handleSubmit}>
            <div>
         <label>
            Username: 
            <input type="text" name='username' value={this.state.formData.username} onChange={this.handleInput} />
            {usernameEmpty && <div className='error-message'>Username cannot be empty!</div>}
         </label> 
         </div>
         <div>
         <label>
            Password: 
            <input type="text" name='password' value={this.state.formData.password} onChange={this.handleInput} />
            {passwordEmpty && <div className='error-message'>Password cannot be empty!</div>}
         </label>
         </div>
         <label>
            I agree:
            <input type="checkbox" name='checked' checked={this.state.checked} onChange={this.handleCheckbox} />
         </label>
          <input type="submit" value="Submit" disabled={usernameEmpty || passwordEmpty || !checked}/>
        </form> </div>}
        {this.state.submited && <h2>Signup succesfull! Username is {this.state.formData.username} and password is {this.state.formData.password}.</h2>}
        {this.state.counterA === 60 && <h2>Sign up failed!</h2>}
        </div>
      );
    }

    componentDidMount() {
        let counter = 0;
        const interval = setInterval(() => {
        counter += 1;
        this.setState({
            counterA: counter
        })
            if (counter === 60) {
                clearInterval(interval);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

  }

 

  export default SignupForm