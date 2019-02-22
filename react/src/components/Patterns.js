import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString  from 'query-string';

import api from '../api';
import { titleSuffix } from '../config';
import LoadingIndicator from './LoadingIndicator';

class Patterns extends Component {
  state = {
    patterns: [],
    page: undefined,
    limit: 20,
    showNext: false,
    showPrevious: false,
    loading: true,
  }

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

    const response = await api.get(`/patterns?page=${page}&limit=${this.state.limit}`);

    document.title = `Page ${page}${titleSuffix}`;

    this.setState({
      page,
      patterns: response.patterns,
      showPrevious: page > 1,
      showNext: page < response.totalPages,
      loading: false,
    });
  }

  render() {
    const { patterns, showPrevious, showNext, loading, page } = this.state;

    return (
      <div>
        <LoadingIndicator loading={loading}></LoadingIndicator>

        {!loading && patterns.length > 0 &&
          <div className="pattern-tiles-container">
            {patterns.map(pattern => (
              <div key={pattern._id}>
                <Link to={`/pattern/${pattern._id}`} className='pattern-tile'>
                  <img src={`${pattern.imageUrl.replace('/upload', '/upload/c_thumb,w_150,h_150')}`} alt={pattern.name}/>
                  <div className="pattern-tile-meta">
                    <div className="pattern-tile-name">{pattern.name}</div>
                    <div className="pattern-tile-user">by {pattern.user.displayName}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        }

        {!loading && patterns.length === 0 &&
          <div className="not-found">No patterns found</div>
        }

        <div className="pagination footer-navigation">
          {showPrevious && <Link to={`/patterns?page=${page - 1}`} className='footer-link previous'>Previous Page</Link>}
          {showNext && <Link to={`/patterns?page=${page + 1}`} className='footer-link next'>Next Page</Link>}
        </div>

        <div className="footer-ads">
          {/* <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <ins class="adsbygoogle"
              style="display:block"
              data-ad-client="ca-pub-5755919955683762"
              data-ad-slot="9668770775"
              data-ad-format="auto"></ins>
          <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
          </script> */}
        </div>
      </div>
    );
  }
}

export default Patterns;
