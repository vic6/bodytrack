import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class RegisterForm extends Component {
  state = {
    name: '',
    username: '',
    units_of_measurement: 'imperial',
    height: '',
    email: '',
    password: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      name,
      username,
      units_of_measurement: unitsOfMeasurement,
      height,
      email,
      password
    } = this.state;
    console.log(this.state);
    return (
      <form onSubmit={event => this.props.handleRegisterSubmit(event, this.state)}>
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
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <FormControl
            name="units"
            componentClass="select"
            placeholder="Units of Measurement"
            onChange={this.handleChange}
            value={unitsOfMeasurement}
          >
            <option value="imperial">Imperial(inches)</option>
            <option value="metric">Metric(cm)</option>
          </FormControl>
        </FormGroup>

        <FormGroup>
          <FormControl
            type="integer"
            value={height}
            name="height"
            placeholder="Height"
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
        <input type="submit" />
      </form>
    );
  }
}
