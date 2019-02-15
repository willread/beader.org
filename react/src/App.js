import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';

const apiPath = 'https://beader-api.herokuapp.com';

class App extends Component {
  state = {
    user: undefined,
  };

  constructor(props) {
    super(props);

    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
  }

  authenticate() {
    // TODO
    // POST `${apiPath}/auth`
      // code: "4/8gCQSAq_jumj83OYJQyOq_xAKRxNKaNjc00oNiRo7kTlnNTlgPapLpRlXnIX8PR6a07JdbaE7HlJErFPsIoBaU8",…}
      // clientId: "204545753423-3igb69ajb3be6ftc6mu8ftkgmvqe3hcv.apps.googleusercontent.com"
      // code: "4/8gCQSAq_jumj83OYJQyOq_xAKRxNKaNjc00oNiRo7kTlnNTlgPapLpRlXnIX8PR6a07JdbaE7HlJErFPsIoBaU8"
      // redirectUri: "http://beader.org"
      // state: "p50vjtizaz"
  }

  logout() {
    localStorage.removeItem('token');
    this.setState({user: undefined});
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const token = localStorage.getItem('token');

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
              ? <a onClick={this.authenticate}>Sign in with Google</a>
              : <a onClick={this.logout}>Log Out</a>
            }
          </div>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App;
