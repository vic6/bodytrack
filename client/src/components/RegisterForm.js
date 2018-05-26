import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

export default class RegisterForm extends Component {
  constructor() {
    super();
    this.state = { name: '', username: '', email: '', password: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { name, username, email, password } = this.state;

    return (
      <form>
        <FormGroup>
          <FormControl
            type="text"
            value={name}
            placeholder="Name"
            onChange={this.handleChange}
            name="name"
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="text"
            value={username}
            placeholder="Username"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="password"
            value={password}
            placeholder="Password"
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
      // <div className="form">
      //   <form
      //     onChange={this.handleChange}
      //     onSubmit={event => this.props.handleRegisterSubmit(event, this.state)}>
      //     <input type="text" name="name" value={name} placeholder="Name" />
      //     <input type="text" name="username" value={username} placeholder="Username" />
      //     <input type="email" name="email" value={email} placeholder="email" />
      //     <input type="password" name="password" value={password} placeholder="Password" />
      //     <input type="submit" value="Register" />
      //   </form>
      // </div>
    );
  }
}
