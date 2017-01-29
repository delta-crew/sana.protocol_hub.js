import React from 'react';

import ProtocolViewHistoryList from './ProtocolViewHistoryList';

class ProtocolViewHistory extends React.Component {
  render() {
    return (
      <div id='protocol-view-body-xml-container'>
          <ProtocolViewHistoryList
              switchRevision={this.props.switchRevision}
              switchView={this.props.switchView} />
      </div>
    );
  }
}

module.exports = ProtocolViewHistory;
