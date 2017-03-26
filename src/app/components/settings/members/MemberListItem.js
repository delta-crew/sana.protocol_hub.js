import React from 'react';
import OrganizationStore from '../../../stores/OrganizationStore';

class MemberListItem extends React.Component {
  constructor(props) {
    super(props);

    this._onRemove = this._onRemove.bind(this);
  }

  _onRemove(e) {
    const { organization, member } = this.props;
    OrganizationStore.removeMember(organization.id, member.user.id);
    e.preventDefault();
  }

  render() {
    return (
      <div className='member-list-item row vertical-align'>
        <div className='col-xs-9 member-list-item-left'>
          <h4>{this.props.member.user.first_name} {this.props.member.user.last_name}</h4>
        </div>

        <div className='col-xs-3 member-list-item-right'>
          <a href='#' onClick={this._onRemove}>Remove</a>
        </div>
      </div>
    );
  }
}

module.exports = MemberListItem;
