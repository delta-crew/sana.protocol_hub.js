import React from 'react';

import ImportProtocolList from './ImportProtocolList';

class ImportPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <header id="import-header">
            <h2>Builder Protocols</h2>
          </header>

          <div id="import-protocols-container">
            <ImportProtocolList />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ImportPage;
