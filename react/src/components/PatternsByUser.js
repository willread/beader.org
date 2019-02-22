import queryString from 'query-string';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { get } from '../api';
import { UserContext } from '../App';
import { titleSuffix } from '../config';

import LoadingIndicator from './LoadingIndicator';

class PatternsByUser extends Component {
  limit = 20;

  state = {
    patterns:[],
    page: 1,
    showNext: false,
    showPrevious: false,
    loading: true,
  };

  componentDidMount() {
    this.fetch();
  }


  componentDidUpdate(prevProps, prevState) {
    if(prevProps.location.search !== this.props.location.search) {
      window.scrollTo({top: 0});
      this.fetch();
    }
  }

  async fetch() {
    const query = queryString.parse(this.props.location.search);
    const page = query.page ? parseInt(query.page, 10) : 1;

    this.setState({loading: true});

    const response = await get(`/patterns/user/${this.props.match.params.id}?page=${page}&limit=${this.limit}`);

    document.title = `Patterns By ${response.patterns[0].user.displayName}${titleSuffix}`;

    this.setState({
      page,
      patterns: response.patterns,
      showPrevious: page > 1,
      showNext: page < response.totalPages,
      loading: false,
    });
  }

  render() {
    const { loading, page, patterns, showNext, showPrevious } = this.state;

    return (
        <UserContext.Consumer>{user =>
          <div>
            {loading ? <LoadingIndicator loading={loading}></LoadingIndicator> :
              <div>
                {patterns.length &&
                  <div className='pattern-tiles-container'>
                    <h3 className='pattern-tiles-container-header'>Patterns By {patterns[0].user.displayName}</h3>
                    {patterns.map(pattern =>
                      <div key={pattern._id}>
                        <Link to={`/pattern/${pattern._id}`} className='pattern-tile'>
                          <img src={pattern.imageUrl.replace('/upload', '/upload/c_thumb,w_150,h_150')} alt={pattern.name} />
                          <div className='pattern-tile-name'>{pattern.name}</div>
                          <div className='pattern-tile-user'>by {pattern.user.displayName}</div>
                          </Link>
                      </div>
                    )}
                  </div>
                }

                {!patterns.length &&
                  <div className='not-found'>No patterns found</div>
                }

                <div className='pagination footer-navigation'>
                  {showPrevious &&
                    <Link to={`/patterns/user/${this.props.match.params.id}?page=${page - 1}`} className='footer-link previous'>Previous Page</Link>
                  }
                  {showNext &&
                    <Link to={`/patterns/user/${this.props.match.params.id}?page=${page + 1}`} className='footer-link next'>Next Page</Link>
                  }
                </div>
              </div>
            }
          </div>
        }</UserContext.Consumer>
    );
  }
}

export default PatternsByUser;
