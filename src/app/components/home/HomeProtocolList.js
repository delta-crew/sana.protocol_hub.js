import React from 'react';

import HomeProtocolListItem from './HomeProtocolListItem';

class HomeProtocolList extends React.Component {
  render() {
    let protocols = this.props.protocols;

    return (
      <div id='home-protocol-list'>
        <div>
          {protocols.map((protocol) =>
            <HomeProtocolListItem key={protocol.id} title={protocol.title} protocolId={protocol.id} />
          )}
        </div>
      </div>
    );
  }
}

export default HomeProtocolList;
