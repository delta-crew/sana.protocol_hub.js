import React from 'react';

class MdsProtocolListItem extends React.Component {
  render() {
    var className = this.props.selected ? 'mdsprotocol-item-selected' : 'mdsprotocol-item';

    return (
      <div className={className}>
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

module.exports = MdsProtocolListItem;
