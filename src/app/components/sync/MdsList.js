import React from 'react';

import MdsProtocolListToolbar from './MdsProtocolListToolbar';
import MdsProtocolListItem from './MdsProtocolListItem';

class MdsList extends React.Component {
  render() {
    return (
      <div className='mdsprotocol-list-outer'>
        <div className='mdsprotocol-list-inner'>
          <h2 className='mdsprotocol-list-title'>MDS's</h2>
          <MdsProtocolListToolbar />
          <div className='mdsprotocol-item-group'>
            <MdsProtocolListItem name='MDS 1' selected={true} />
            <MdsProtocolListItem name='MDS 2' selected={false} />
            <MdsProtocolListItem name='MDS 3' selected={false} />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = MdsList;
