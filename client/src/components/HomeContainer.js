import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Home from './Home';
import Auth from '../modules/Auth';
import EditSnapshotForm from './EditSnapshotForm';
import SnapshotTable from './SnapshotTable';

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
    console.log('Payload', formPayLoad);
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
    console.log('WHY')
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
    });
  }

  editImage = (snapshotId) => {
    this.setState({ editSnapshot: !this.state.editSnapshot });
    console.log(snapshotId);
    // const weight = event.target.weight.value;
    // const hip_size = event.target.hip_size.value;
    // const info = { weight, hip_size };
    // console.log(info);

  };

  deleteImage = snapshotId => {
    console.log('ID', snapshotId);
    fetch(`/snapshots/${snapshotId}`, {
      method: 'DELETE',
      body: snapshotId,
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(res => console.log('RESPONSE', res))
      .then(() => {
        if (this.state.index1 === this.state.snapshots.length - 1) {
          let newIndex = this.state.snapshots.length - 2;
          if (newIndex < 0) newIndex = 0;
          console.log('NEW INDEX', this.state.index2);
          return this.setState({ index1: newIndex, index2: this.state.snapshots.length - 1 });
        }
        console.log('NEW INDEX', this.state.index2);
        return this.setState({ index2: this.state.snapshots.length - 1 });
      })
      .then(() => this.getUserSnapshots());
  };

  readFile = (event, file, stats, resetForm) => {
    event.preventDefault();
    if (file) {
      const formPayLoad = new FormData();
      formPayLoad.append('uploaded_image', file);
      formPayLoad.append('stats_attributes', JSON.stringify(stats));
      this.sendImageToController(formPayLoad);
      // resetForm(event);
    }
  };

  handleCarouselIndex1 = index => {
    const currentIndex = index;
    if (this.state.loaded) {
      this.setState({ index1: currentIndex, editSnapshot: false });
    }
  };

  handleCarouselIndex2 = index => {
    const currentIndex = index;
    if (this.state.loaded) {
      this.setState({ index2: currentIndex, editSnapshot: false });
    }
  };

  renderImages = () => {
    const { snapshots, index1, index2, editSnapshot } = this.state;
    if (snapshots.length) {
      return (
        <Grid container spacing={8}>
          <Grid item sm={6} xs={12}>
            <Paper sm={6} xs={12}>
              <Carousel
                id="carousel1"
                selectedItem={index1}
                showThumbs={false}
                onChange={this.handleCarouselIndex1}
                infiniteLoop>
                {this.state.snapshots.map(snap => (
                  <div key={snap.id} id={snap.id}>
                    <img alt="snapshot" src={snap.picture.url} max-width="20%" height="500px" />
                    {/* <p className="legend">{snap.created_at.match('[^T]*')}</p> */}
                  </div>
                ))}
              </Carousel>
            </Paper>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Paper sm={6} xs={12}>
              <Carousel
                id="carousel2"
                selectedItem={index2}
                showThumbs={false}
                onChange={this.handleCarouselIndex2}
                infiniteLoop>
                {this.state.snapshots.map(snap => (
                  <div key={snap.id}>
                    <img alt="snapshot" src={snap.picture.url} max-width="20%" height="500px" />
                  </div>
                ))}
              </Carousel>
            </Paper>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Paper sm={6} xs={12}>
              {editSnapshot ? (
                <EditSnapshotForm
                  snapshots={snapshots}
                  index={index1}
                  editImage={this.editImage}
                  sendUpdatedSnapshotData={this.sendUpdatedSnapshotData}
                  deleteImage={this.deleteImage}
                 />
              ) : (
                <SnapshotTable
                  snapshots={snapshots}
                  index={index1}
                  editImage={this.editImage}
                  deleteImage={this.deleteImage}
                />
              )}
            </Paper>

            <form onSubmit={event => this.editImageInfo(event, snapshots[index1].id)}>
              <label>
                Weight <input name="weight" type="text" value="5000" />
              </label>
              <label>
                Hip Size<input name="hip_size" type="text" value="9000" />
              </label>
              <input name="submit" type="submit" />
            </form>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Paper sm={6} xs={12}>
              <SnapshotTable snapshots={snapshots} index={index2} deleteImage={this.deleteImage} />
            </Paper>
          </Grid>
        </Grid>
      );
    }
    return <p>Add Images</p>;
  };

  render() {
    const { loaded, snapshots, index1, index2 } = this.state;
    console.log('INDEX1', index1, 'INDEX2', index2);
    console.log('SNAPSHOTS', snapshots);
    const currentSlide1 = loaded && snapshots.length ? snapshots[index1].picture.url : '';
    const currentSlide2 = loaded && snapshots.length ? snapshots[index2].picture.url : '';

    return (
      <div>
        <Home
          loaded={this.state.loaded}
          renderImages={this.renderImages}
          readFile={this.readFile}
          slide1={currentSlide1}
          slide2={currentSlide2}
        />
      </div>
    );
  }
}
