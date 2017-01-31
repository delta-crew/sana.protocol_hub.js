import React from 'react';

class SearchResultsListItem extends React.Component {
  render() {
    return (
      <div className='search-results-item-group protocol-list-item'>
        <span className='search-results-item-left'>
          <a href={'protocol/' + this.props.protocol.id} className='protocol-list-item-name'>{this.props.protocol.name}</a>
        </span>
      </div>
    );
  }
}

module.exports = SearchResultsListItem;
