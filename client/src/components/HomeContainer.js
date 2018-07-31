import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Home from './Home';
import Auth from '../modules/Auth';
import CarouselTable from './CarouselTable';

export default class HomeContainer extends Component {
  state = { snapshots: [], loaded: false, index1: 0, index2: 0, editSnapshot: false };

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
        this.setState({
          snapshots: res.snapshots.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
          loaded: true,
          index2: res.snapshots.length - 1 || 0
        });
      })
      .then(() => this.setState({ index2: this.state.snapshots.length - 1 || 0 }))
      .catch(errors => console.log(errors));
  };

  sendImageToController = formPayLoad => {
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

  sendUpdatedSnapshotData = (event, data, snapshotId) => {
    event.preventDefault();
    fetch(`/snapshots/${snapshotId}`, {
      method: 'PUT',
      body: JSON.stringify({
        snapshot: data
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(this.setState({ editSnapshot: false }))
      .then(() => this.getUserSnapshots());
  };

  toggleEditSnapshot = () => {
    this.setState({ editSnapshot: !this.state.editSnapshot });
  };

  deleteImage = snapshotId => {
    fetch(`/snapshots/${snapshotId}`, {
      method: 'DELETE',
      body: snapshotId,
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(() => {
        if (this.state.index1 === this.state.snapshots.length - 1) {
          let newIndex = this.state.snapshots.length - 2;
          if (newIndex < 0) newIndex = 0;
          return this.setState({ index1: newIndex, index2: this.state.snapshots.length - 1 });
        }
        return this.setState({ index2: this.state.snapshots.length - 1 });
      })
      .then(() => this.getUserSnapshots());
  };

  readFile = (event, file, stats, resetForm) => {
    event.preventDefault();
    if (file) {
      const formPayLoad = new FormData();
      formPayLoad.append('snapshot', JSON.stringify(stats));
      formPayLoad.append('picture', file);
      this.sendImageToController(formPayLoad);
      resetForm(event);
    }
  };

  handleCarousel = (index, carousel) => {
    const currentIndex = index;
    if (this.state.loaded) {
      this.setState({ [carousel]: currentIndex, editSnapshot: false });
    }
  };

  renderImages = () => {
    const { snapshots, index1, index2, editSnapshot, loaded } = this.state;
    if (snapshots.length) {
      return (
        <Grid container spacing={8} justify="center">
          <CarouselTable
            id={'index1'}
            editSnapshot={editSnapshot}
            toggleEditSnapshot={this.toggleEditSnapshot}
            sendUpdatedSnapshotData={this.sendUpdatedSnapshotData}
            deleteImage={this.deleteImage}
            snapshots={snapshots}
            index={index1}
            loaded={loaded}
            handleCarousel={this.handleCarousel}
          />
          <CarouselTable
            id={'index2'}
            editSnapshot={editSnapshot}
            sendUpdatedSnapshotData={this.sendUpdatedSnapshotData}
            toggleEditSnapshot={this.toggleEditSnapshot}
            deleteImage={this.deleteImage}
            snapshots={snapshots}
            index={index2}
            loaded={loaded}
            handleCarousel={this.handleCarousel}
          />
        </Grid>
      );
    }
    return <p>Add Images</p>;
  };

  render() {
    const { loaded, snapshots, index1, index2 } = this.state;
    const currentSlide1 = loaded && snapshots.length ? snapshots[index1].picture.url : '';
    const currentSlide2 = loaded && snapshots.length ? snapshots[index2].picture.url : '';
    return (
      <Home
        loaded={this.state.loaded}
        renderImages={this.renderImages}
        readFile={this.readFile}
        slide1={currentSlide1}
        slide2={currentSlide2}
      />
    );
  }
}
