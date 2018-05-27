import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
// import Auth from '../modules/Auth';

export default class AddPictureForm extends Component {
  constructor() {
    super();
    this.state = { uploads: [] };
  }

  render() {
    console.log(this.state);
    return (
      // <form onSubmit={(event)=>this.props.readFile(event)}>
      //   <input type="file" accect="image/*" />
      //   <button>Upload</button>
      // </form>

      // <form>
      //   <FormGroup controlId="formsControlsFile">
      //     <ControlLabel>File</ControlLabel>
      //     <FormControl type="file" label="File" />
      //   </FormGroup>
      //   <Button type="submit">Submit</Button>
      // </form>
      // <div>
      <Dropzone onDrop={this.props.readFile}>
        {this.state.uploads[0] ? (
          <div>
            <img alt="preview" src={this.state.uploads[0].picture.url} />
            <p>Drag or click again to change image</p>
          </div>
        ) : (
          <p>Drag in a file or click to upload a logo (jpeg/png only)</p>
        )}
      </Dropzone>
      // </div>
    );
  }
}
