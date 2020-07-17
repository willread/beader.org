import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import store from 'store';

import api from './api';
import './App.scss';
import config from './config.js';

const images = {
  logo: require('./images/logo.png'),
}

export const UserContext = React.createContext();

class App extends Component {
  searchRef =React.createRef();

  state = {
    user: undefined,
    search: '',
  };

  logout() {
    store.remove('token');
    this.setState({user: undefined});
  }

  componentDidMount() {
    const oldToken = store.get('aurelia_token');

    if (oldToken) {
      store.remove('aurelia_token');
      store.set('token', oldToken);
    }

    this.fetchUser();
  }

  async fetchUser() {
    const user = await api.get('/auth')
      .catch(e => {
        //
      });

    if (user && user._id) {
      this.setState({user});
    } else {
      this.setState({user: undefined});
    }
  }

  async onGoogleSuccess(response) {
    if (response.code) {
      const result = await api.post('/auth', {
        code: response.code,
        clientId: config.googleClientId,
        redirectUri: config.googleRedirectUri,
      });

      store.set('token', result.token);
      this.fetchUser();
    }
  }

  onGoogleFailure() {
    // TODO: Handle failure
  }

  search(e) {
    const search = this.state.search;
    e.preventDefault();
    this.setState({search: ''});
    this.searchRef.current.blur();
    this.props.history.push(`/patterns?search=${search}`);
  }

  render() {
    return (
      <div>
        <header className='navbar'>
          <Link to='/' className='logo'>
            <img src={images.logo} width='73' height='21' alt='Beader.org Logo' />
          </Link>

          <div className='menu-left'>
            <Link to='/'>Gallery</Link>
            <Link to='/designer/new' className='new-pattern'>Create a Pattern</Link>
            {this.state.user &&
              <Link to={`/patterns/user/${this.state.user._id}`}>My Patterns</Link>
            }
          </div>

          <div className='search'>
            <form onSubmit={(e) => this.search(e)}>
              <input type='text' ref={this.searchRef} value={this.state.search} onChange={(e) => this.setState({search: e.target.value})} placeholder='Search...'></input>
            </form>
          </div>

          <div className='menu-right'>
            {!this.state.user
              ? <GoogleLogin
                  clientId={config.googleClientId}
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
