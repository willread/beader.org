import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import store from 'store';

import api from './api';
import './App.scss';
import { googleClientId, googleRedirectUri } from './config.js';

const images = {
  logo: require('./images/logo.png'),
}

export const UserContext = React.createContext();

class App extends Component {
  state = {
    user: undefined,
    search: undefined,
  };

  logout() {
    store.remove('token');
    this.setState({user: undefined});
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const user = await api.get('/auth');

    if (user._id) {
      this.setState({user});
    } else {
      this.setState({user: undefined});
    }
  }

  async onGoogleSuccess(response) {
    if (response.code) {
      const result = await api.post('/auth', {
        code: response.code,
        clientId: googleClientId,
        redirectUri: googleRedirectUri,
      });

      store.set('token', result.token);
      this.fetchUser();
    }
  }

  onGoogleFailure() {
    // TODO: Handle failure
  }

  search(e) {
    e.preventDefault();
    this.props.history.push(`/patterns?search=${this.state.search}`);
  }

  render() {
    return (
      <div>
        <header className='navbar'>
          <div className='logo'>
            <img src={images.logo} width='73' height='21' alt='Beader.org Logo' />
          </div>

          <div className='menu-left'>
            <Link to='/'>Gallery</Link>
            <Link to='/designer' className='new-pattern'>Designer</Link>
            {this.state.user &&
              <Link to={`/patterns/user/${this.state.user._id}`}>My Patterns</Link>
            }
          </div>

          <div className='search'>
            <form onSubmit={(e) => this.search(e)}>
              <input type='text' value={this.state.search} onChange={(e) => this.setState({search: e.target.value})} placeholder='Search...'></input>
            </form>
          </div>

          <div className='menu-right'>
            {!this.state.user
              ? <GoogleLogin
                  clientId={googleClientId}
                  render={props => (
                    <button onClick={() => props.onClick()}>Sign in with Google</button>
                  )}
                  onSuccess={this.onGoogleSuccess.bind(this)}
                  onFailure={this.onGoogleFailure.bind(this)}
                  responseType='code'></GoogleLogin>
              : <span>
                  <span className='welcome'>Welcome, {this.state.user.displayName}</span>
                  <button onClick={() => this.logout()}>Log Out</button>
                </span>
            }
          </div>
        </header>
        <div className='app-content'>
          <UserContext.Provider value={this.state.user}>
            {this.props.children}
          </UserContext.Provider>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
