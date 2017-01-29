import React from 'react';

class HomeProcedureListItem extends React.Component {
  render() {
    return (
      <div className='protocol-list-item'>
        <span className='protocol-list-item-left'>
          <a href={'protocol/' + this.props.protocolId} className='protocol-list-item-name'>{this.props.name}</a>
          <a href='#' className='home-protocol-edit'>Edit</a>
        </span>
      </div>
    );
  }
}

module.exports = HomeProcedureListItem;
