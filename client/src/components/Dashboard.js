import React, { Component } from 'react';
import AddCharacterForm from './AddCharacterForm';
import Auth from '../modules/Auth';

export default class Dashboard extends Component {
  state = { myCharacters: null, loaded: false };

  componentDidMount() {
    this.getUserCharacters();
  }

  getUserCharacters = () => {
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ myCharacters: res.characters, loaded: true });
      })
      .catch(err => console.log(err));
  };

  handleAddCharacter = (event, data, cb) => {
    event.preventDefault();
    fetch('/characters', {
      method: 'POST',
      body: JSON.stringify({
        character: data
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    }).then(() => {
      this.getUserCharacters();
      cb();
    });
  };

  resetForm = event => {
    event.preventDefault();
    this.setState({ name: '', description: '' });
  };

  renderCharacters = () =>
    this.state.myCharacters.map(character => (
      <div key={character.id} className="character">
        <h3>{character.name}</h3>
        <p>{character.description}</p>
      </div>
    ));

  render() {
    const { loaded } = this.state;
    return (
      <div className="characters">
        <AddCharacterForm handleAddCharacter={this.handleAddCharacter} resetForm={this.resetForm} />
        {loaded ? this.renderCharacters() : <p>...Loading</p>}
      </div>
    );
  }
}
