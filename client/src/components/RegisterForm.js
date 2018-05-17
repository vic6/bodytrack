import React, { Component } from 'react';

export default class RegisterForm extends Component {
  state = {name: '', username: '', email: '', password: ''}

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { name, username, email, password } = this.state;

    return(
      <div className='form'>
        <form onChange={this.handleChange} onSubmit={(event)=>this.props.handleRegisterSubmit(event, this.state)}>
          <input type='text' name='name' value={name} placeholder='Name'/>
          <input type='text' name='username' value={username} placeholder='Username'/>
          <input type='email' name='email' value={email} placeholder='email'/>
          <input type='password' name='password' value={password} placeholder='Password'/>
          <input type='submit' value='Register'/>
        </form>
      </div>
    )
  }
}
