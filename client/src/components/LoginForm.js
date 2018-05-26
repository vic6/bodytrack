import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';

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
      <Form
        horizontal
        onChange={this.handleChange}
        onSubmit={event => this.props.handleLogin(event, this.state)}>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Username
          </Col>
          <Col sm={8}>
            <FormControl type="text" placeholder="Username" value={username} name="username" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={8}>
            <FormControl type="password" placeholder="Password" value={password} name="password" />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={8}>
            <Button type="submit">Log in</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
