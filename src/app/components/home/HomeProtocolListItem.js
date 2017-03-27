import React from 'react';
import { Link } from 'react-router';

class HomeProtocolListItem extends React.Component {
  render() {
    return (
      <div className='protocol-list-item'>
        <span className='protocol-list-item-left'>
          <Link to={'/protocol/' + this.props.protocolId} className='protocol-list-item-name'>{this.props.title}</Link>
          {/* TODO }<a href='' className='home-protocol-edit'>Edit</a>*/}
        </span>
      </div>
    );
  }
}

export default HomeProtocolListItem;
