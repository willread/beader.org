import React, { Component } from 'react';

class Pattern extends Component {
  render() {
    return (
      <div>Pattern: {this.props.match.params.id}</div>
    );
  }
}

export default Pattern;
