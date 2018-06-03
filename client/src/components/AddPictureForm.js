import React, { Component } from 'react';
import { Button, Col, ControlLabel, HelpBlock, FormGroup, FormControl, PageHeader } from 'react-bootstrap';
import './AddPictureForm.css';

export default class AddPictureForm extends Component {
  state = {
    selectedFile: null,
    stats: { chestSize: '', waistSize: '', neckSize: '', hipSize: '', weight: '' }
  };

  handleFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      stats: { ...this.state.stats, [name]: value }
    });
    console.log(this.state.stats);
  };

  resetFrom = event => {
    event.target.reset();
    this.setState({
      selectedFile: null,
      stats: { chestSize: '', waistSize: '', neckSize: '', hipSize: '', weight: '' }
    });
  };

  FieldGroup = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );

  render() {
    const { weight, neckSize, chestSize, hipSize, waistSize, selectedFile, stats } = this.state;
    return (
      <div className='picture-form'>
        <PageHeader as='h2'>
          Add Image
        </PageHeader>
        <Col xs={12} s={6}>
          <form onSubmit={event => this.props.readFile(event, selectedFile, stats, this.resetFrom)}>
            <this.FieldGroup
              id="formControlsText"
              type="number"
              label="Weight"
              placeholder="Weight"
              name="weight"
              value={weight}
              onChange={this.handleChange}
            />
            <this.FieldGroup
              id="formControlsText"
              type="number"
              label="Neck Size"
              placeholder="Neck Size"
              name="neckSize"
              value={neckSize}
              onChange={this.handleChange}
            />
            <this.FieldGroup
              id="formControlsText"
              type="number"
              label="Chest Size"
              placeholder="Chest Size"
              name="chestSize"
              value={chestSize}
              onChange={this.handleChange}
            />
            <this.FieldGroup
              label="Waist Size"
              placeholder="Waist size"
              type="number"
              value={waistSize}
              name="waistSize"
              onChange={this.handleChange}
            />
            <this.FieldGroup
              label="Hip Size"
              placeholder="Hip size"
              type="number"
              value={hipSize}
              name="hipSize"
              onChange={this.handleChange}
            />
            <input
              ref={this.setInputFormRef}
              onChange={this.handleFileChange}
              type="file"
              accept="image/*"
            />
            {/* <input type="submit" name="Submit" /> */}
            <Button bsStyle='primary' block type='submit'>Upload</Button>
          </form>
        </Col>
      </div>
    );
  }
}
