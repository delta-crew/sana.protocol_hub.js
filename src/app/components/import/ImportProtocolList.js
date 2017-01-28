import React from 'react';

import ImportProtocolListItem from './ImportProtocolListItem';

class ImportProtocolList extends React.Component {
  render() {
    return (
      <div id='import-protocol-list'>
          <ImportProtocolListItem name='Protocol 1' imported={false} />
          <ImportProtocolListItem name='Protocol 2' imported={false} />
          <ImportProtocolListItem name='Protocol 3' imported={true} />
      </div>
    );
  }
}

module.exports = ImportProtocolList;
