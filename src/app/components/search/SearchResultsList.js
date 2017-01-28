import React from 'react';

import { map } from 'lodash';

class SearchResultsList extends React.Component {
  render() {
    let results_list = ['test/test-protocol', 'user/test1', 'user/test2'];

    return (
      <div className='search-results-list'>
          <h2>Results</h2>
          <div className='search-results-item-group'>
              {map(results_list, (protocol_name, i) => <div key={i}><a href='/users'>{protocol_name}</a><br /></div>)}
          </div>
      </div>
    );
  }
}

module.exports = SearchResultsList;
