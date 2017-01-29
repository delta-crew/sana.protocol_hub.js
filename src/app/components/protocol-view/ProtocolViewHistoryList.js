import React from 'react';

import ProtocolViewHistoryListItem from './ProtocolViewHistoryListItem';

class ProtocolViewHistoryList extends React.Component {
  render() {
    return (
      <div className='protocol-view-history-list'>
        <ProtocolViewHistoryListItem
            revision='current'
            switchRevision={this.props.switchRevision}
            switchView={this.props.switchView} />
        <ProtocolViewHistoryListItem
            revision='2017-01-01'
            switchRevision={this.props.switchRevision}
            switchView={this.props.switchView} />
        <ProtocolViewHistoryListItem
            revision='2016-10-27'
            switchRevision={this.props.switchRevision}
            switchView={this.props.switchView} />
      </div>
    );
  }
}

module.exports = ProtocolViewHistoryList;
