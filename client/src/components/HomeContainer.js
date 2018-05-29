import React, { Component } from 'react';
import Home from './Home';
import Auth from '../modules/Auth';

export default class HomeContainer extends Component {
  state = { snapshots: [], loaded: false, active: false };

  componentDidMount() {
    this.getUserSnapshots();
  }

  getUserSnapshots = () => {
    fetch('/home', {
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
  };

  sendImageToController = formPayLoad => {
    console.log('Payload', formPayLoad);
    debugger;
    fetch('/snapshots', {
      method: 'POST',
      body: formPayLoad,
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(() => this.getUserSnapshots())
      .catch(err => console.log(err));
  };

  toggleClass = () => {
    this.setState(prevState => ({ active: !prevState.active }));
  };

  readFile = (event, file, stats) => {
    console.log('STATS', stats)
    event.preventDefault();
    if (file) {
      const formPayLoad = new FormData();
      formPayLoad.append('uploaded_image', file);
      formPayLoad.append('stats', JSON.stringify(stats))
      this.sendImageToController(formPayLoad);
    }
  };

  logPicture = (event) => {
    console.log(event.target.dataset.date)
    // console.log(event.target.data('key').key);
    console.log()
    // console.log(event.target.firstChild)
  }

  renderImages = () =>
    this.state.snapshots.map(snap => (
      <div data-date={snap.created_at} role='presentation' onClick={(event)=> this.logPicture(event)} key={snap.id}>
        <img alt="snapshot" src={snap.picture.url} max-width="20%" height="500px" />
        <p className={this.state.active ? null : 'legend'}>{snap.created_at.match('[^T]*')}</p>
      </div>
    ));

  renderImageData = () =>
    this.state.snapshots.map(snap => (
      <table key={snap.id}>
        <tr>
          <th>Neck Size</th>
          <th>Chest Size</th>
          <th>Waist Size</th>
        </tr>
        <tr>
          <td>{snap.neck_size}</td>
          <td>{snap.created_at}</td>
          <td>{snap.waist_size}</td>
        </tr>
      </table>
    ));
  render() {
    return (
      <Home
        loaded={this.state.loaded}
        renderImages={this.renderImages}
        renderImageData={this.renderImageData}
        readFile={this.readFile}
      />
    );
  }
}
