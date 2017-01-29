import React from 'react';

class GroupPermissionsDropdown extends React.Component {
  render() {
    let permissions = this.state.permissions;

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
