import React from 'react';

import MdsProtocolListToolbar from './MdsProtocolListToolbar';
import MdsProtocolListItem from './MdsProtocolListItem';

class ProtocolList extends React.Component {
  render() {
    return (
      <div className='mdsprotocol-list-outer'>
        <div className='mdsprotocol-list-inner'>
          <h2 className='mdsprotocol-list-title'>Protocols</h2>
          <MdsProtocolListToolbar />
          <div className='mdsprotocol-item-group'>
            <MdsProtocolListItem name='Protocol 1' selected={true} />
            <MdsProtocolListItem name='Protocol 2' selected={false} />
            <MdsProtocolListItem name='Protocol 3' selected={true} />
            <MdsProtocolListItem name='Protocol 4' selected={true} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ProtocolList;
