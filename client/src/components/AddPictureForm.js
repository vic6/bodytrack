import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
// import Auth from '../modules/Auth';

export default class AddPictureForm extends Component {
  state = { selectedFile: [] };

  handleFileChange = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  handleUpload = () => {
    console.log(this.state.selectedFile)
  }

  render() {
    console.log(this.state.selectedFile);
    return (
      // <form onSubmit={this.handleUploadImage}>
      //   <div>
      //     <input
      //       ref={ref => {
      //         this.uploadInput = ref;
      //       }}
      //       type="file"
      //     />
      //   </div>
      //   <div>
      //     <input
      //       ref={ref => {
      //         this.fileName = ref;
      //       }}
      //       type="text"
      //       placeholder="Enter the desired name of file"
      //     />
      //   </div>
      //   <br />
      //   <div>
      //     <button>Upload</button>
      //   </div>
      //   <img src={this.state.imageURL} alt="img" />
      // </form>
      // onSubmit={(event)=>this.props.readFile(event)
      <div>

      <form onSubmit={(event)=>this.props.readFile(event, [this.state.selectedFile])}>
        <input onChange={this.handleFileChange} type="file" accept="image/*" />
        <input type='submit' name='Submit' />
      </form>

      <Dropzone onDrop={this.props.readFile}>
        {this.state.selectedFile[0] ? (
          <div>
            <img alt="preview" src={this.state.selectedFile[0].picture.url} />
            <p>Drag or click again to change image</p>
          </div>
        ) : (
          <p>Drag in a file or click to upload a logo (jpeg/png only)</p>
        )}
      </Dropzone>
    </div>

      // <form>
      //   <FormGroup controlId="formsControlsFile">
      //     <ControlLabel>File</ControlLabel>
      //     <FormControl type="file" label="File" />
      //   </FormGroup>
      //   <Button type="submit">Submit</Button>
      // </form>
      // <div>
      // </div>
    );
  }
}
