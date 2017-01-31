import React from 'react';

import SearchResultsList from './SearchResultsList';

class SearchResultsPage extends React.Component {
  render() {
    let results = [
      {
        id: 1,
        name: 'delta/protocol1',
      },
      {
        id: 2,
        name: 'delta/protocol2',
      },
      {
        id: 3,
        name: 'delta/protocol3',
      },
      {
        id: 4,
        name: 'delta/protocol4',
      },
    ];

    return (
      <div>
          <form>
              <input type='text' name='query' placeholder='search for protocols...' />
              <input type='submit' value='Search' />
          </form>

          <SearchResultsList results={results} />
      </div>
    );
  }
}

module.exports = SearchResultsPage;
