import React from 'react';

import ProtocolListToolbar from './ProtocolListToolbar';
import ProtocolListItem from './ProtocolListItem';

class MdsList extends React.Component {
  render() {
    return (
      <div className='mdsprotocol-list-outer'>
        <div className='mdsprotocol-list-inner'>
          <h2 className='mdsprotocol-list-title'>Synced Protocols</h2>
          <ProtocolListToolbar />
          <div className='mdsprotocol-item-group'>
            {this.props.protocols.map((protocol) => 
              <ProtocolListItem key={protocol.id} name={protocol.name} onClick={this.props.onItemClick}/>
            )}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = MdsList;
