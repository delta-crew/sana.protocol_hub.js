import React from 'react';

class MemberListItem extends React.Component {
  render() {
    return (
      <div className='member-list-item'>
          <h4>{this.props.member}</h4>
          <a>Remove</a>
      </div>
    );
  }
}

module.exports = MemberListItem;
