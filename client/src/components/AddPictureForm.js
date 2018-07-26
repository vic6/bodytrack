import React, { Component } from 'react';
import {
  Button,
  Col,
  ControlLabel,
  HelpBlock,
  FormGroup,
  FormControl,
  PageHeader
} from 'react-bootstrap';
import './AddPictureForm.css';

export default class AddPictureForm extends Component {
  state = {
    showForm: false,
    selectedFile: null,
    stats: { chest_size: '', waist_size: '', neck_size: '', hip_size: '', weight: '' }
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

  resetForm = event => {
    event.target.reset();
    this.setState({
      selectedFile: null,
      stats: { chest_size: '', waist_size: '', neck_size: '', hip_size: '', weight: '' }
    });
  };

  FieldGroup = ({ id, label, help, ...props }) => (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );

  toggleForm = () => {
    this.pageBottom.scrollIntoView();
    this.setState({ showForm: !this.state.showForm });
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    this.pageBottom.scrollIntoView();
  };

  render() {
    const {
      weight,
      neck_size: neckSize,
      chest_size: chestSize,
      hip_size: hipSize,
      waist_size: waistSize,
      selectedFile,
      stats
    } = this.state;
    return (
      <div>
        {!this.state.showForm ? (
          <Button onClick={this.toggleForm}>Add Snapshot</Button>
        ) : (
          <div className="picture-form">
            <PageHeader as="h2">Add Image</PageHeader>
            <Col xs={10} s={6} m={8}>
              <form
                onSubmit={event => this.props.readFile(event, selectedFile, stats, this.resetForm)}
              >
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
                  name="neck_size"
                  value={neckSize}
                  onChange={this.handleChange}
                />
                <this.FieldGroup
                  id="formControlsText"
                  type="number"
                  label="Chest Size"
                  placeholder="Chest Size"
                  name="chest_size"
                  value={chestSize}
                  onChange={this.handleChange}
                />
                <this.FieldGroup
                  label="Waist Size"
                  placeholder="Waist size"
                  type="number"
                  value={waistSize}
                  name="waist_size"
                  onChange={this.handleChange}
                />
                <this.FieldGroup
                  label="Hip Size"
                  placeholder="Hip size"
                  type="number"
                  value={hipSize}
                  name="hip_size"
                  onChange={this.handleChange}
                />
                <input
                  ref={this.setInputFormRef}
                  onChange={this.handleFileChange}
                  type="file"
                  accept="image/*"
                />
                {/* <input type="submit" name="Submit" /> */}
                <Button onClick={this.toggleForm} xs={6} type="submit">
                  Cancel
                </Button>
                <Button xs={6} bsStyle="primary" type="submit">
                  Upload
                </Button>
                {/* <input label="submit" type="submit" /> */}
              </form>
            </Col>
          </div>
        )}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.pageBottom = el;
          }}
        />
      </div>
    );
  }
}
