import React from 'react';

import ProtocolViewHistoryListItem from './ProtocolViewHistoryListItem';

class ProtocolViewHistoryList extends React.Component {
  render() {
    return (
      <div className='protocol-view-history-list'>
        {this.props.revisions.map((revision) =>
          <ProtocolViewHistoryListItem
              key={revision.revision_date}
              revision={revision}
              switchRevision={this.props.switchRevision}
              switchView={this.props.switchView} />
        )}
      </div>
    );
  }
}

module.exports = ProtocolViewHistoryList;
