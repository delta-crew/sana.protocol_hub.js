import React from 'react';

class ImportProtocolListItem extends React.Component {
  render() {
    return (
      <div id='import-protocol-list'>
          <ImportProtocolItem name='Protocol 1' imported={false} />
          <ImportProtocolItem name='Protocol 2' imported={false} />
          <ImportProtocolItem name='Protocol 3' imported={true} />
      </div>
    );
  }
}

module.exports = ImportProtocolListItem;
