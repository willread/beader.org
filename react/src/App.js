import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import store from 'store';

import './App.scss';
import { apiPath, googleClientId, googleRedirectUri } from './config.js';

export const UserContext = React.createContext();

class App extends Component {
  state = {
    user: undefined,
  };

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.onGoogleSuccess = this.onGoogleSuccess.bind(this);
    this.onGoogleFailure = this.onGoogleFailure.bind(this);
  }

  logout() {
    store.remove('token');
    this.setState({user: undefined});
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const token = store.get('token');

    if (token) {
      const user = await fetch(`${apiPath}/auth`, {
        method: 'get',
        headers: new Headers({
          'Authorization': `Bearer ${token}`
        })
      })
        .then(response => response.json());

      this.setState({user});
    }
  }

  async onGoogleSuccess(response) {
    if (response.code) {
      const result = await fetch(`${apiPath}/auth`, {
        method: 'post',
        body: {
          code: response.code,
          clientId: googleClientId,
          redirectUri: googleRedirectUri
        }
      })
        .then(response => response.json());

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
              <Link to={`/patterns/user/${this.state.user.id}`}>My Patterns</Link>
            }
          </div>

          <div className='menu-right'>
            {!this.state.user
              ? <GoogleLogin
                  clientId={googleClientId}
                  render={props => (
                    <button onClick={props.onClick}>Sign in with Google</button>
                  )}
                  onSuccess={this.onGoogleSuccess}
                  onFailure={this.onGoogleFailure}
                  responseType='code'></GoogleLogin>
              : <button onClick={this.logout}>Log Out</button>
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
