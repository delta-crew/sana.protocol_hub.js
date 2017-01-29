import React from 'react';

class HomeProcedureListItem extends React.Component {
  render() {
    return (
      <div className='protocol-list-item'>
        <span className='protocol-list-item-left'>
          <span className='protocol-list-item-name'>
            <h3>{this.props.name}</h3>
          </span>
          <a href='' className='home-protocol-edit'>Edit</a>
        </span>
      </div>
    );
  }
}

module.exports = HomeProcedureListItem;
