import React from 'react';

import HomeProtocolListItem from './HomeProtocolListItem';

class HomeProtocolList extends React.Component {
  render() {
    return (
      <div id='home-protocol-list'>
        <div>
          <HomeProtocolListItem name='Protocol 1' protocolId={1} />
          <HomeProtocolListItem name='Protocol 2' protocolId={2} />
          <HomeProtocolListItem name='Protocol 3' protocolId={3} />
          <HomeProtocolListItem name='Protocol 4' protocolId={4} />
        </div>
      </div>
    );
  }
}

module.exports = HomeProtocolList;
