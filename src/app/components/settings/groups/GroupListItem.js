import React from 'react';

class MemberListItem extends React.Component {
  render() {
    let group = this.props.group;

    return (
      <div className='member-list-item'>
        <h4>{group.name}</h4>
        <h4>{group.members.length} members</h4>
        <a>Edit <span className='caret'></span></a>
        <a>Remove</a>
      </div>
    );
  }
}

module.exports = MemberListItem;
