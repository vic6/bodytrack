import React, { Component } from 'react';

export default class CharacterList extends Component {
  state = { characterList: null, characterListLoaded: false };

  componentDidMount() {
    fetch('/characters')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          characterList: res.characters,
          characterListLoaded: true
        });
      })
      .catch(err => console.log(err));
  }

  renderCharacters = () =>
    this.state.characterList.map(character => (
      <div className="character" key={character.id}>
        <h2>{character.name}</h2>
        <p>{character.description}</p>
      </div>
    ));

  render() {
    return (
      <div className="character-list">
        {this.state.characterListLoaded ? this.renderCharacters() : <p>...Loading</p>}
      </div>
    );
  }
}
