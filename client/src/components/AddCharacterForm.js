import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
// import Auth from '../modules/Auth';

export default class AddCharacterForm extends Component {
  constructor() {
    super();
    this.state = { name: '', description: '', file: [] }

    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  sendImageToController(formPayLoad){

  fetch(`/your/api/namespace/endpoint/${'hi'}/${'all'}`, {
    credentials: 'same-origin',
    headers: {},
    method: 'POST',
    body: formPayLoad
  })

  // might be a good idea to put error handling here

  .then(response => response.json())
  .then(imageFromController => {
    // optionally, you can set the state of the component to contain the image
    // object itself that was returned from the rails controller, completing
    // the post cycle
    this.setState({file: this.state.file.concat(imageFromController)})
  })
}

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  resetForm() {
    this.setState({name: '', description: ''})
  }

  readFile(files) {
    if(files && files[0]) {
      const formPayload = new FormData();
      formPayload.append('upladed_image', files[0]);
      this.sendImageToController(formPayload);
    }
  }

  render() {
    const { name, description } = this.state;
    return(
      <div className='new-character-form'>
        <form onChange={this.handleChange}
          onSubmit={(event)=>this.props.handleAddCharacter(event, this.state, this.resetForm)}>
          <input type='text' name='name' placeholder='Name' value={name}/>
          <input type='text' name='description' placeholder='description' value={description}/>
          <input type='submit' value='Add character'/>
        </form>
        <div>
          <Dropzone onDrop={this.readFile}>
            <button>Add a new image</button>
            { this.state.file[0] ? (
        <div>
             <img alt='preview' src={this.state.file[0].preview} />
             <p>Drag or click again to change image</p>
        </div>
     ) : (
        <p>Drag in a file or click to upload a logo (jpeg/png only)</p>
     )}

          </Dropzone>
        </div>
      </div>
    )
  }
}
