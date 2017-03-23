import React from 'react';

import ProtocolStore from '../../stores/ProtocolStore';
import SearchResultsList from './SearchResultsList';

class SearchResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: ProtocolStore.getAll()
    }
  }

  _onSearch() {
    let results = ProtocolStore.getAll();
    this.setState({
      results: results
    });
  }

  componentWillMount() {
    ProtocolStore.addChangeListener(this._onSearch);
    //fetch this.props.params.query;
  }

  componentWillUnmount() {
    ProtocolStore.removeChangeListener(this._onSearch);
  }

  render() {
    let results = this.state.results;
    let results_div = results.length ?
      <SearchResultsList results={this.state.results} /> :
      <div>No Results Found</div>;

    return (
      <div>
        <form>
          <input type='text' name='query' placeholder='search for protocols...' />
          <input type='submit' value='Search' />
        </form>

        {results_div}
      </div>
    );
  }
}

module.exports = SearchResultsPage;
