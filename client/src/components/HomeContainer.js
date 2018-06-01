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
        console.log('RESPONSE', res);
        this.setState({ snapshots: res.snapshots, loaded: true });
      })
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

  toggleClass = () => {
    this.setState(prevState => ({ active: !prevState.active }));
  };

  readFile = (event, file, stats) => {
    console.log('STATS', stats);
    event.preventDefault();
    if (file) {
      const formPayLoad = new FormData();
      formPayLoad.append('uploaded_image', file);
      formPayLoad.append('stats', JSON.stringify(stats));
      this.sendImageToController(formPayLoad);
    }
  };

  logPicture = event => {
    console.log(event.target.dataset.date);
    console.log(event.target.dataset.waist);
    // debugger;
    // console.log(event.target.data('key').key);
    console.log();
    // console.log(event.target.firstChild)
  };

  myHandler1 = index => {
    const currentIndex = index;
    if (this.state.loaded) {
      this.setState({ index1: currentIndex });
      console.log(this.state);
    }
  };

  myHandler2 = index => {
    const currentIndex = index;
    if (this.state.loaded) {
      this.setState({ index2: currentIndex });
      console.log(this.state);
    }
  };

  // renderImages = () =>
  //   this.state.snapshots.map(snap => (
  //     <div data-date={snap.created_at} data-waist={snap.waist_size} role='presentation' onClick={(event)=> this.logPicture(event)} key={snap.id} id={snap.id}>
  //       <img alt="snapshot" src={snap.picture.url} max-width="20%" height="500px" />
  //       <p className={this.state.active ? null : 'legend'}>{snap.created_at.match('[^T]*')}</p>
  //     </div>
  //   ));

  renderImages = () => {
    const waist_size = this.state.sn
    const {snapshots, index1, index2} = this.state
    return (
      <Grid container spacing={8}>
        <Grid item sm={6} xs={12}>
          <Paper sm={6} xs={12}>
            <Carousel
              id="carousel2"
              selectedItem={index1}
              showThumbs={false}
              onChange={this.myHandler1}
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
              onChange={this.myHandler2}
              infiniteLoop>
              {this.state.snapshots.map(snap => (
                <div
                  data-date={snap.created_at}
                  data-waist={snap.waist_size}
                  role="presentation"
                  onClick={event => this.logPicture(event)}
                  key={snap.id}
                  id={snap.id}>
                  <img alt="snapshot" src={snap.picture.url} max-width="20%" height="500px" />
                  <p className={this.state.active ? null : 'legend'}>
                    {snap.created_at.match('[^T]*')}
                  </p>
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
                  <TableCell>Measurement</TableCell>
                  <TableCell>Result(inches)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Weight</TableCell>
                  <TableCell>150</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Neck</TableCell>
                  <TableCell>{snapshots[index1].neck_size || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Waist</TableCell>
                  <TableCell>{snapshots[index1].waist_size || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hip</TableCell>
                  <TableCell>{snapshots[index1].hip_size || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>URL</TableCell>
                  <TableCell>{this.state.snapshots[this.state.index1].picture.url}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Paper sm={6} xs={12}>
            {this.state.snapshots[this.state.index2].picture.url}
          </Paper>
        </Grid>
      </Grid>
    );
  };

  render() {
    const { loaded, snapshots, index1, index2 } = this.state;
    const currentSlide1 = loaded ? snapshots[index1].picture.url : '';
    const currentSlide2 = loaded ? snapshots[index2].picture.url : '';

    return (
      <div>
        <Home
          loaded={this.state.loaded}
          renderImages={this.renderImages}
          readFile={this.readFile}
          slide1={currentSlide1}
          slide2={currentSlide2}
        />
        {/* <div>
          <h3>{currentSlide1}</h3>
          <h3>{currentSlide2}</h3>
        </div> */}
      </div>
    );
  }
}
