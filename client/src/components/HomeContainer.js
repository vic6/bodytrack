import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Home from './Home';
import Auth from '../modules/Auth';

export default class HomeContainer extends Component {
  state = { snapshots: [], loaded: false, index1: 0, index2: 0 };

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
      formPayLoad.append('stats', JSON.stringify(stats));
      this.sendImageToController(formPayLoad);
      // resetForm(event);
    }
  };

  handleCarouselIndex1 = index => {
    const currentIndex = index;
    if (this.state.loaded) {
      this.setState({ index1: currentIndex });
    }
  };

  handleCarouselIndex2 = index => {
    const currentIndex = index;
    if (this.state.loaded) {
      this.setState({ index2: currentIndex });
    }
  };

  renderImages = () => {
    const { snapshots, index1, index2 } = this.state;
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
                    <p className="legend">{snap.created_at.match('[^T]*')}</p>
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
                    <p className={'legend'}>{snap.created_at.match('[^T]*')}</p>
                  </div>
                ))}
              </Carousel>
            </Paper>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Paper sm={6} xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Measurement{snapshots[index1].id}</TableCell>
                    <TableCell>Result(inches)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Date
                    </TableCell>
                    <TableCell>{snapshots[index1].created_at.match('[^T]*')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Weight</TableCell>
                    <TableCell>{snapshots[index1].weight || 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Neck</TableCell>
                    <TableCell>{snapshots[index1].neck_size || 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Chest</TableCell>
                    <TableCell>{snapshots[index1].chest_size || 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Waist</TableCell>
                    <TableCell>{snapshots[index1].waist_size || 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hip</TableCell>
                    <TableCell>{snapshots[index1].hip_size || 0}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Paper sm={6} xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Measurement{snapshots[index2].id}</TableCell>
                    <TableCell>Result(inches)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Date
                    </TableCell>
                    <TableCell>{snapshots[index2].created_at.match('[^T]*')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Weight</TableCell>
                    <TableCell>{snapshots[index2].weight || 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Neck</TableCell>
                    <TableCell>{snapshots[index2].neck_size || 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Chest</TableCell>
                    <TableCell>{snapshots[index2].chest_size || 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Waist</TableCell>
                    <TableCell>{snapshots[index2].waist_size || 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hip</TableCell>
                    <TableCell>{snapshots[index2].hip_size || 0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell onClick={() => this.deleteImage(snapshots[index2].id)}>
                      Delete snapshot
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
