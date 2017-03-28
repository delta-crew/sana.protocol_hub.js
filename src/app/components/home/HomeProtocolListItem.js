import React from 'react';
import { Link } from 'react-router';

class HomeProtocolListItem extends React.Component {
  render() {
    return (
      <div className='protocol-list-item'>
        <span className='protocol-list-item-left'>
          <Link to={'/protocol/' + this.props.protocolId} className='protocol-list-item-name'>{this.props.title}</Link>
          <Link to={'/share/' + this.props.protocolId}>Share</Link>
        </span>
      </div>
    );
  }
}

export default HomeProtocolListItem;
