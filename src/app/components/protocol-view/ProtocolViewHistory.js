import React from 'react';

import ProtocolViewHistoryList from './ProtocolViewHistoryList';

class ProtocolViewHistory extends React.Component {
  render() {
    return (
      <div className='protocol-view-body-history-container'>
        <ProtocolViewHistoryList
            versions={this.props.versions}
            switchVersion={this.props.switchVersion}
            switchView={this.props.switchView} />
      </div>
    );
  }
}

module.exports = ProtocolViewHistory;
