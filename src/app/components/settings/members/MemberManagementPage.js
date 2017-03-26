import React from 'react';

import SettingsNav from '../SettingsNav';
import MemberList from './MemberList';
import OrganizationStore from '../../../stores/OrganizationStore';
import UserStore from '../../../stores/UserStore';

class MemberManagementPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      organization: OrganizationStore.getActiveOrg(),
      members: [],
      users: [],
      query: '',
    };

    this._onChange = this._onChange.bind(this);
    this._searchForMembers = this._searchForMembers.bind(this);
    this._getUserRow = this._getUserRow.bind(this);
    this._updateQuery = this._updateQuery.bind(this);
    this._addUser = this._addUser.bind(this);

    if (this.state.organization !== null) {
      OrganizationStore.fetchMembers(this.state.organization.id);
    }

    OrganizationStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  }

  _onChange() {
    const state = {
      organization: OrganizationStore.getActiveOrg(),
      users: UserStore.getUsers(),
    };

    if (state.organization !== null && (
        this.state.organization === null ||
        this.state.organization.id !== state.organization.id)) {
      OrganizationStore.fetchMembers(state.organization.id);
    } else {
      state.members = OrganizationStore.getMembers();
    }

    this.setState(state);
  }

  _addUser(user) {
    OrganizationStore.addMember(this.state.organization.id, user.id);
  }

  _getUserRow(user, i) {
    return (
      <div key={i} className='row'>
        <div className='col-xs-10'>
          {user.first_name} {user.last_name} ({user.username})
        </div>
        <div className='col-xs-2'>
          <a href="#" onClick={this._addUser.bind(this, user)}>
            Add
          </a>
        </div>
      </div>
    );
  }

  _searchForMembers(e) {
    UserStore.fetchUsers(this.state.query);
    e.preventDefault();
  }

  _updateQuery(e) {
    this.setState({
      query: e.target.value,
    });
  }

  render() {
    const { organization, members, users, query } = this.state;

    if (organization === null) {
      return (
        <div className='member-management-page row'>
          <div className='col-xs-3'>
            <SettingsNav active='members' />
          </div>
          <div className='col-xs-9'>
            <div className='row'>
              <div className='col-xs-7 member-managment-header-left'>
                <h2>Organization Settings</h2>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                Choose an organization or create one to continue...
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='member-management-page row'>
        <div className='col-xs-3'>
          <SettingsNav active='members' />
        </div>

        <div className='col-xs-9'>
          <div className='row'>
            <div className='col-xs-7 member-managment-header-left'>
              <h2>Members</h2>
            </div>
            <div className='col-xs-5 member-managment-header-right'>
              <h3>Total {members.length}</h3>
            </div>
          </div>
          <MemberList users={members} />
          <div className='row'>
            <div className='col-xs-7 member-managment-header-left'>
              <h2>Add Members</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
              <form onSubmit={this._searchForMembers}>
                Search for users:
                <input type="text" value={query} onChange={this._updateQuery} />
              </form>
            </div>
          </div>
          {users.map(this._getUserRow)}
        </div>
      </div>
    );
  }
}

module.exports = MemberManagementPage;
