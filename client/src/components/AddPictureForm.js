import React, { Component } from 'react';
// import Dropzone from 'react-dropzone';
import { Button } from 'react-bootstrap';

export default class AddPictureForm extends Component {
  state = { selectedFile: null };

  setInputFormRef = (element) => {
    this.inputForm = element
  }

  inputForm = null;

  handleFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  // resetInput = (input) => {
  // }

  handleUpload = () => {
    console.log(this.state.selectedFile);
  };

  render() {
    console.log(this.state.selectedFile);
    return (
      <div>
        <form onSubmit={event => this.props.readFile(event, this.state.selectedFile)}>
          <input
            ref={this.setInputFormRef}
            onChange={this.handleFileChange}
            type="file"
            accept="image/*"
          />
          <input type='submit' name='Submit' />
          {/* <Button>Upload</Button> */}
        </form>

        {/* <Dropzone onDrop={this.props.readFile}>
        {this.state.selectedFile ? (
          <div>
            <img alt="preview" src={this.state.selectedFile.picture.url} />
            <p>Drag or click again to change image</p>
          </div>
        ) : (
          <p>Drag in a file or click to upload a logo (jpeg/png only)</p>
        )}
      </Dropzone> */}

      </div>

      // <div>
      // </div>
    );
  }
}
