import React from 'react';

class ProtocolViewHistoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.switchRevision = this.switchRevision.bind(this);
  }

  switchRevision() {
    this.props.switchRevision(this.props.revision);
    this.props.switchView('xml');
  }

  render() {
    return (
      <div className="protocol-view-history-list-item">
          <span className="protocol-view-history-list-item-revision">
              {this.props.revision}
          </span>
          <span className="protocol-view-history-list-item-link">
              <a href='#' onClick={this.switchRevision}>View XML</a>
          </span>
      </div>
    );
  }
}

module.exports = ProtocolViewHistoryListItem;
