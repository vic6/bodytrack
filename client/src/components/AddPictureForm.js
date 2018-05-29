import React, { Component } from 'react';
// import Dropzone from 'react-dropzone';
import { Button } from 'react-bootstrap';

export default class AddPictureForm extends Component {
  state = { selectedFile: null, stats: { chest_size: '' } };

  setInputFormRef = element => {
    this.inputForm = element;
  };

  inputForm = null;

  handleFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      stats: {[name]: value}
    });
  };

  render() {
    return (
      <div>
        <form
          onChange={this.handleChange}
          onSubmit={event => this.props.readFile(event, this.state.selectedFile, this.state.stats)}>
          <input placeholder='Chest size' type="number" name="chest_size" value={this.state.stats.chest_size} />
          <input
            ref={this.setInputFormRef}
            onChange={this.handleFileChange}
            type="file"
            accept="image/*"
          />
          <input type="submit" name="Submit" />
          {/* <Button>Upload</Button> */}
        </form>
      </div>
    );
  }
}
