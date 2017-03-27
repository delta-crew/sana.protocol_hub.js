import React from 'react';

import SearchResultsListItem from './SearchResultsListItem';
import ProtocolStore from '../../stores/ProtocolStore';
import { map } from 'lodash';

class SearchResultsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='search-results-list'>
        {map(this.props.results, (protocol, i) =>
          <SearchResultsListItem key={i} protocol={protocol} />
        )}
      </div>
    );
  }
}

module.exports = SearchResultsList;
