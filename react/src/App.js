import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';

class App extends Component {
  authenticate() {
    // TODO
  }

  logout() {
    // TODO
  }

  render() {
    const isAuthenticated = false; // TODO
    const user = null; // TODO

    return (
      <div>
        <header class='navbar'>
          <div class='logo'>beader</div>

          <div class='menu-left'>
            <Link to='/'>Pattern Gallery</Link>
            <Link to='/designer' class='new-pattern'>New Pattern</Link>
            {isAuthenticated &&
              <Link to={`/patterns/user/${user.id}`}>My Patterns</Link>
            }
          </div>

          <div class='menu-right'>
            {!isAuthenticated
              ? <a onClick={this.authenticate.bind(this)}>Sign in with Google</a>
              : <a onClick={this.logout.bind(this)}>Log Out</a>
            }
          </div>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;
