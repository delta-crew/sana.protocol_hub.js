import React from 'react';

import SearchResultsList from './SearchResultsList';

class SearchResultsPage extends React.Component {
  render() {
    return (
      <div>
          <form>
              <input type='text' name='query' placeholder='search for protocols...' />
              <input type='submit' value='Search' />
          </form>

          <SearchResultsList />

          <div className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>
                  Sort Relevance<span className='caret'></span>
              </a>
              <ul className='dropdown-menu'>
                  <li><a>Name</a></li>
                  <li><a>Creator</a></li>
                  <li><a>Popularity</a></li>
                  <li><a>Date Modified</a></li>
              </ul>
          </div>
      </div>
    );
  }
}

module.exports = SearchResultsPage;
