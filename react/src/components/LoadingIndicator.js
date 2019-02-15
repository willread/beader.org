import React, { Component } from 'react';
import gif from '../images/loading.gif';

class LoadingIndicator extends Component {
  render() {
    return (
      <div className='loading-indicator-wrapper'>
        {this.props.loading &&
          <div className='loading-indicator'>
            <img alt='Loading indicator' src={gif}/>
          </div>
        }
      </div>
    );
  }
}

export default LoadingIndicator;
