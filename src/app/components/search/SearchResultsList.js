import React from 'react';

import SearchResultsListItem from './SearchResultsListItem';
import { map } from 'lodash';

class SearchResultsList extends React.Component {
  render() {
    return (
      <div className='search-results-list'>

        <div className='search-results-header row vertical-align'>
          <div className='col-xs-7 search-results-header-left'>
            <h2>Results</h2>
          </div>

          <div className='col-xs-5 search-results-header-right'>
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
        </div>

        {map(this.props.results, (protocol, i) =>
          <SearchResultsListItem key={i} protocol={protocol} />
        )}
      </div>
    );
  }
}

module.exports = SearchResultsList;
