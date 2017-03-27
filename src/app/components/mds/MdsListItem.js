import React from 'react';
import { Link } from 'react-router';

class MdsListItem extends React.Component {
  render() {
    return (
      <div className='mds-list-item'>
        <span className='mds-list-item-left'>
          <Link to={`/organizations/${this.props.organizationId}/mds/${this.props.id}`} className='mds-list-item-name'>{this.props.name}</Link>
          <a href={this.props.url} target='_BLANK'>{this.props.url}</a>
        </span>
      </div>
    );
  }
}

export default MdsListItem;
