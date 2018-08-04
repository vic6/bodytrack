import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import './App.css';
import AddPictureForm from './components/AddPictureForm';
import Auth from './modules/Auth';
import Dashboard from './components/Dashboard';
import HomeContainer from './components/HomeContainer';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile'
import RegisterForm from './components/RegisterForm';
import NavBar from './components/NavBar';
import Landing from './components/Landing';

class App extends Component {
  state = { auth: Auth.isUserAuthenticated(), errors: null };

  handleRegisterSubmit = (event, data) => {
    console.log('USER DATA', data);
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
      });
  };

  handleLogin = (event, data) => {
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
        // if (res.errors) {
        //   this.setState({errors: res.errors})
        // }
        Auth.authenticateToken(res.token);
        console.log('RES err', res.errors);
        this.setState({ auth: Auth.isUserAuthenticated(), errors: res.errors });
      });
  };

  handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    }).then(() => {
      Auth.deauthenticateToken();
      this.setState({ auth: Auth.isUserAuthenticated() });
    });
  };

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <NavBar
              handleLogout={this.handleLogout}
              isLoggedIn={this.state.auth}
            />
            <Route exact path="/characters" render={() => <HomeContainer />} />
            <Route
              exact
              path="/register"
              render={() =>
                this.state.auth ? (
                  <Redirect to="/home" />
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
                  <Redirect to="/home" />
                ) : (
                  <LoginForm handleLogin={this.handleLogin} errors={this.state.errors} />
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
            <Route
              path="/home"
              render={() => (this.state.auth ? <HomeContainer /> : <Redirect to="/login" />)}
            />
            <Route
              path="/profile"
              render={() => (this.state.auth ? <Profile /> : <Redirect to="/login" />)}
            />
            <Route exact path="/" render={() => <Landing />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
