import React from 'react';

import ProtocolStore from '../../stores/ProtocolStore';
import SearchResultsList from './SearchResultsList';

class SearchResultsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    }

    this._onSearch = this._onSearch.bind(this);
  }

  _onSearch() {
    let results = ProtocolStore.getAll();
    this.setState({
      results: results
    });
  }

  componentWillReceiveProps(props) {
    const { query } = props.location.query;
    ProtocolStore.fetchPublicProtocols(query);
  }

  componentWillMount() {
    const { query } = this.props.location.query;
    ProtocolStore.addChangeListener(this._onSearch);
    ProtocolStore.fetchPublicProtocols(query);
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
        <h2>Public Protocol Directory</h2>
        {results_div}
      </div>
    );
  }
}

module.exports = SearchResultsPage;
