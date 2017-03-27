import React from 'react';
import { Link } from 'react-router';

class SearchResultsListItem extends React.Component {
  render() {
    return (
      <div className='search-results-item-group protocol-list-item'>
        <span className='search-results-item-left'>
          <Link to={'/protocol/' + this.props.protocol.id} className='protocol-list-item-name'>{this.props.protocol.title}</Link>
        </span>
      </div>
    );
  }
}

module.exports = SearchResultsListItem;
