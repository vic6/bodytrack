import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Auth from '../modules/Auth';

export default class AddPictureForm extends Component {
  constructor() {
    super();
    this.state = {uploads: []};

    this.readFile = this.readFile.bind(this);
    this.sendImageToController = this.sendImageToController.bind(this);
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
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  sendImageToController(formPayLoad){

  fetch("/snapshots", {
    method: 'POST',
    body: formPayLoad,
    header: {
      token: Auth.getToken(),
      Authorization: `Token ${Auth.getToken()}`
    }
  })
  // might be a good idea to put error handling here
  .then(response => response.json())
  .then(imageFromController => {
    console.log(imageFromController)
    // optionally, you can set the state of the component to contain the image
    // object itself that was returned from the rails controller, completing
    // the post cycle
    this.setState({uploads: this.state.uploads.concat(imageFromController)})
  })
  // .catch(err => console.log(err))
}

  readFile(files) {
  if (files && files[0]) {
    const formPayLoad = new FormData();
    formPayLoad.append('uploaded_image', files[0]);
    this.sendImageToController(formPayLoad)
  }
}


  render() {
    console.log(this.state);
    return (
      <div>
        <Dropzone onDrop={this.readFile}>
          { this.state.uploads[0] ? (
        <div>
             <img alt='preview' src={this.state.uploads[0].picture.url} />
             <p>Drag or click again to change image</p>
        </div>
     ) : (
        <p>Drag in a file or click to upload a logo (jpeg/png only)</p>
     )}
        </Dropzone>
      </div>
    );
  }
}
