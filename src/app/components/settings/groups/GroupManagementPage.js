import React from 'react';

import SettingsNav from '../SettingsNav';
import GroupList from './GroupList';

class GroupManagementPage extends React.Component {
  render() {
    return (
      <div className='group-management-page'>
        <SettingsNav active='groups' />

        <h2>Groups</h2>
        <GroupList />
      </div>
    );
  }
}

module.exports = GroupManagementPage;
