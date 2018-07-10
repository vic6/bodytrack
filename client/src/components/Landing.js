import React, { Component } from 'react';
import './Landing.css';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <p className="landing-text">Measure you body transformation with BodyTrack</p>
        <img
          className="landing-img"
          src="https://images.unsplash.com/photo-1470167290877-7d5d3446de4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2e0d5b717e8434450b0dc3b1f96d59f0&auto=format&fit=crop&w=600&q=80"
          alt="landing"
        />
      </div>
    );
  }
}
