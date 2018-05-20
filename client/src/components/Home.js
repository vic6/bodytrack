import React, { Component } from 'react';
import AddPictureForm from './AddPictureForm';
import Auth from '../modules/Auth';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { snapshots: [], loaded: false };

    this.renderImages = this.renderImages.bind(this);
  }

  componentDidMount() {
    fetch('/snapshots', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ snapshots: res.snapshots, loaded: true });
      })
      .catch(errors => console.log(errors));
  }

  renderImages() {
    return this.state.snapshots.map(snap => (
      <div>
        <img alt="snapshot" src={snap.picture.url} />
      </div>
    ));
  }

  render() {
    const { loaded } = this.state;
    console.log(this.state.snapshots);
    return (
      <div>
        <AddPictureForm />
        {loaded ? this.renderImages() : <p>...Loading</p>}
      </div>
    );
  }
}
