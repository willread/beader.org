import React, { Component } from 'react';

class PatternsByUser extends Component {
  render() {
    return (
      <div>PatternsByUser: {this.props.match.params.id}</div>
    );
  }
}

export default PatternsByUser;
