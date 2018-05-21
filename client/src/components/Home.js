import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import AddPictureForm from './AddPictureForm';
import Auth from '../modules/Auth';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { snapshots: [], loaded: false };

    this.getUserSnapshots = this.getUserSnapshots.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.readFile = this.readFile.bind(this);
    this.sendImageToController = this.sendImageToController.bind(this);
  }

  componentDidMount() {
    this.getUserSnapshots();
  }

  getUserSnapshots() {
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
  }

  sendImageToController(formPayLoad) {
    fetch('/snapshots', {
      method: 'POST',
      body: formPayLoad,
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(() => this.getUserSnapshots())
      // might be a good idea to put error handling here
      // .then(response => response.json())
      // .then(imageFromController => {
      // console.log(imageFromController);
      // this.setState({ uploads: this.state.uploads.concat(imageFromController) });
      // })
      .catch(err => console.log(err));
  }

  readFile(files) {
    if (files && files[0]) {
      const formPayLoad = new FormData();
      formPayLoad.append('uploaded_image', files[0]);
      this.sendImageToController(formPayLoad);
    }
  }

  renderImages() {
    return this.state.snapshots.map(snap => (
      <div key={snap.id}>
        <img alt="snapshot" src={snap.picture.url} max-width='100%' />
      </div>
    ));
  }

  render() {
    const { loaded } = this.state;
    console.log(this.state.snapshots);
    return (
      <div>
        <AddPictureForm readFile={this.readFile} />
      <div style={{display: 'flex'}}>
        <Carousel dynamicHeight>
          {loaded ? (
            this.renderImages()
          ) : (
            <img alt="cat" src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
          )}
        </Carousel>
        <Carousel dynamicHeight>
          {loaded ? (
            this.renderImages()
          ) : (
            <img alt="cat" src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
          )}
        </Carousel>
      </div>
    </div>

    );
  }
}

/* <div>
  <AddPictureForm readFile={this.readFile} />
  {loaded ? this.renderImages() : <p>...Loading</p>}
</div> */
