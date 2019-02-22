import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import store from 'store';

import api from './api';
import './App.scss';
import { googleClientId, googleRedirectUri } from './config.js';

export const UserContext = React.createContext();

class App extends Component {
  state = {
    user: undefined,
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
        redirectUri: googleRedirectUri
      });

      store.set('token', result.token);
      this.fetchUser();
    }
  }

  onGoogleFailure() {
    // TODO: Handle failure
  }

  render() {
    return (
      <div>
        <header className='navbar'>
          <div className='logo'>beader</div>

          <div className='menu-left'>
            <Link to='/'>Pattern Gallery</Link>
            <Link to='/designer' className='new-pattern'>New Pattern</Link>
            {this.state.user &&
              <Link to={`/patterns/user/${this.state.user._id}`}>My Patterns</Link>
            }
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
              : <button onClick={() => this.logout()}>Log Out</button>
            }
          </div>
        </header>
        <UserContext.Provider value={this.state.user}>
          {this.props.children}
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
