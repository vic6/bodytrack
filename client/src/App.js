import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom';
import './App.css';
import AddPictureForm from './components/AddPictureForm';
import Auth from './modules/Auth';
import CharacterList from './components/CharacterList';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

class App extends Component {
  constructor() {
    super();
    this.state = { auth: Auth.isUserAuthenticated() };

    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleRegisterSubmit(event, data) {
    event.preventDefault();
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        user: data
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({ auth: Auth.isUserAuthenticated() });
      })
      .catch(err => console.log(err));
  }

  handleLogin(event, data) {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        Auth.authenticateToken(res.token);
        this.setState({ auth: Auth.isUserAuthenticated() });
      })
      .catch(err => console.log(err));
  }

  handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(() => {
        Auth.deauthenticateToken();
        this.setState({ auth: Auth.isUserAuthenticated() });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="nav">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/dash">Dashboard</Link>
            <Link to="/characters">All charaters</Link>
            <Link to="#" onClick={this.handleLogout}>
              Logout
            </Link>
          </div>
          <Route exact path="/characters" render={() => <CharacterList />} />
          <Route
            exact
            path="/register"
            render={() =>
              this.state.auth ? (
                <Redirect to="/dash" />
              ) : (
                <RegisterForm handleRegisterSubmit={this.handleRegisterSubmit} />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={() =>
              this.state.auth ? (
                <Redirect to="/dash" />
              ) : (
                <LoginForm handleLogin={this.handleLogin} />
              )
            }
          />
          <Route
            exact
            path="/dash"
            render={() =>
              this.state.auth ? (
                <Dashboard handleNewCharacterSubmit={this.handleNewCharacterSubmit} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/snapshots"
            render={() => (this.state.auth ? <AddPictureForm /> : <Redirect to="/login" />)}
          />
          <Route path='/home' render={() => (this.state.auth ? <Home /> : <Redirect to="/login" />)} />
        </div>
      </Router>
    );
  }
}

export default App;
