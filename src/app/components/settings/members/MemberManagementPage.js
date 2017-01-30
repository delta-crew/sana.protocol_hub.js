import React from 'react';

import SettingsNav from '../SettingsNav';
import MemberList from './MemberList';

class MemberManagementPage extends React.Component {
  render() {
    return (
      <div className='member-management-page row'>
        <div className='col-xs-3'>
          <SettingsNav active='members' />
        </div>

        <div className='col-xs-9'>
          <h2>Members</h2>
          <MemberList />
        </div>
      </div>
    );
  }
}

module.exports = MemberManagementPage;
