import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default class RegisterForm extends Component {
  state = { name: '', username: '', email: '', password: '' };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { name, username, email, password } = this.state;

    return (
      <form onSubmit={(event)=>this.props.handleRegisterSubmit(event, this.state)}>
        <FormGroup>
          <FormControl
            type="text"
            value={name}
            placeholder="Name"
            name="name"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="text"
            value={username}
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="email"
            value={email}
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </FormGroup>
        <input type='submit'/>
      </form>
    );
  }
}
