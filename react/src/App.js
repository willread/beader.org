import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/pattern/4'>/patterns/4</Link></li>
          <li><Link to='/patterns'>/patterns</Link></li>
          <li><Link to='/designer'>/designer</Link></li>
          <li><Link to='/patterns/user/6'>/patterns/user/6</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;
