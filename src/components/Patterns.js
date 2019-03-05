import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString  from 'query-string';
import * as moment from 'moment';

import api from '../api';
import { titleSuffix } from '../config';
import LoadingIndicator from './LoadingIndicator';

class Patterns extends Component {
  state = {
    patterns: [],
    page: undefined,
    search: undefined,
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
    const search = query.search;

    this.setState({search, page, loading: true});

    let url = `/patterns?page=${page}&limit=${this.state.limit}`;

    if (search) {
      url += `&search=${search}`;
    }

    const response = await api.get(url);

    document.title = page > 1 ? `Page ${page}${titleSuffix}` : 'Beader';

    this.setState({
      patterns: response.patterns,
      showPrevious: this.state.page > 1,
      showNext: this.state.page < response.totalPages,
      loading: false,
    });
  }

  render() {
    const { patterns, showPrevious, showNext, loading, page, search } = this.state;

    let previousUrl = `/patterns?page=${page - 1}`;
    let nextUrl = `/patterns?page=${page + 1}`;

    if (search) {
      nextUrl += `&search=${search}`;
      previousUrl += `&search=${search}`;
    }

    return (
      <div>
        <LoadingIndicator loading={loading}></LoadingIndicator>

        {!loading && patterns.length > 0 &&
          <div className="pattern-tiles-container">
            {patterns.map(pattern => (
              <Link to={`/pattern/${pattern._id}`} className='pattern-tile' key={pattern._id}>
                <img src={`${pattern.imageUrl.replace('/upload', '/upload/c_thumb,w_150,h_150')}`} alt={pattern.name}/>
                <div className="pattern-tile-meta">
                  <div className="pattern-tile-name">{pattern.name}</div>
                  <div className="pattern-tile-user">by {pattern.user.displayName}</div>
                  <div className="pattern-tile-date">{moment(pattern.createdOn).format('MMM D YYYY')}</div>
                </div>
              </Link>
            ))}
          </div>
        }

        {!loading && patterns.length === 0 &&
          <div className="not-found">No patterns found</div>
        }

        <div className="pagination footer-navigation">
          {showPrevious && <Link to={previousUrl} className='footer-link previous'>Previous Page</Link>}
          {showNext && <Link to={nextUrl} className='footer-link next'>Next Page</Link>}
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
