import React, { Component } from 'react';

export default class LoginForm extends Component {
  state = { username: '', password: '' };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-form">
        <form
          onSubmit={event => this.props.handleLogin(event, this.state)}
          onChange={this.handleChange}>
          <input type="text" name="username" value={username} placeholder="Username" />
          <input type="password" name="password" value={password} placeholder="Password" />
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}
