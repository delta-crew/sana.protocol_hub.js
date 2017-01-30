import React from 'react';

class MemberListItem extends React.Component {
  render() {
    return (
      <div className='member-list-item row vertical-align'>
        <div className='col-xs-9 member-list-item-left'>
          <h4>{this.props.member}</h4>
        </div>

        <div className='col-xs-3 member-list-item-right'>
          <a href='#'>Remove</a>
        </div>
      </div>
    );
  }
}

module.exports = MemberListItem;
