import React from 'react';

class MemberListItem extends React.Component {
  render() {
    let group = this.props.group;

    return (
      <div className='group-list-item row vertical-align'>
        <div className='col-xs-9 group-list-item-left'>
          <div className='row'>
            <div className='col-xs-5'>
              <h4>{group.name}</h4>
            </div>
            <div className='col-xs-7'>
              <h4>{group.members.length} members</h4>
            </div>
          </div>
        </div>

        <div className='col-xs-3 group-list-item-right'>
          <a className='group-list-item-edit'>Edit<span className='caret'></span></a>
          <a className='group-list-item-remove'>Remove</a>
        </div>
      </div>
    );
  }
}

module.exports = MemberListItem;
