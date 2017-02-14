import React from 'react';

class MdsListItem extends React.Component {
  render() {
    return (
      <div className='mds-list-item'>
        <span className='mds-list-item-left'>
          <a href={'mds/' + this.props.id} className='mds-list-item-name'>{this.props.name}</a>
          <a href='#'>{this.props.link}</a>
        </span>
      </div>
    );
  }
}

module.exports = MdsListItem;
