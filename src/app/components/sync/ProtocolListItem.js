import React from 'react';

class ProtocolListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick(this.props.name);
  }

  render() {
    return (
      <div className='mdsprotocol-item' onClick={this.handleClick}>
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

module.exports = ProtocolListItem;
