import React from 'react';
import { Link } from 'react-router';

class HomeProtocolListItem extends React.Component {
  render() {
    return (
      <div className='protocol-list-item'>
        <span className='protocol-list-item-left'>
          <Link to={'/protocol/' + this.props.protocolId} className='protocol-list-item-name'>{this.props.name}</Link>
          <Link to='#' className='home-protocol-edit'>Edit</Link>
        </span>
      </div>
    );
  }
}

module.exports = HomeProtocolListItem;
