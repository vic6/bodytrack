import React, { Component } from 'react';
// import Auth from '../modules/Auth';

export default class AddCharacterForm extends Component {
  state = { name: '', description: '' }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  resetForm = () => {
    this.setState({name: '', description: ''})
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
      </div>
    )
  }
}
