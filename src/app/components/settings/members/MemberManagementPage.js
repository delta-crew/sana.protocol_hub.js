import React from 'react';

import SettingsNav from '../SettingsNav';
import MemberList from './MemberList';

class MemberManagementPage extends React.Component {
  render() {
    let users = ['mstobo', 'tophelders', 'jrogers'];

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
              <h3>Total {users.length}</h3>
            </div>
          </div>
          <MemberList users={users} />
        </div>
      </div>
    );
  }
}

module.exports = MemberManagementPage;
