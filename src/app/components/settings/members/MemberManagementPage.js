import React from 'react';

import SettingsNav from '../SettingsNav';
import MemberList from './MemberList';

class MemberManagementPage extends React.Component {
  render() {
    return (
      <div className='member-management-page'>
          <SettingsNav active='members' />

          <h2>Members</h2>
          <MemberList />
      </div>
    );
  }
}

module.exports = MemberManagementPage;
