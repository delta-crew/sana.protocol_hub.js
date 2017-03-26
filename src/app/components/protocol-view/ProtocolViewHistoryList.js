import React from 'react';

import ProtocolViewHistoryListItem from './ProtocolViewHistoryListItem';

class ProtocolViewHistoryList extends React.Component {
  render() {
    return (
      <div className='protocol-view-history-list'>
        {this.props.versions.map((version) =>
          <ProtocolViewHistoryListItem
              key={version.version}
              version={version}
              switchVersion={this.props.switchVersion}
              switchView={this.props.switchView} />
        )}
      </div>
    );
  }
}

module.exports = ProtocolViewHistoryList;
