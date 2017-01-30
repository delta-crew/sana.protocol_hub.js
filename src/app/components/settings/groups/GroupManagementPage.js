import React from 'react';

import SettingsNav from '../SettingsNav';
import GroupList from './GroupList';

class GroupManagementPage extends React.Component {
  render() {
    return (
      <div className='group-management-page row'>
        <div className='col-xs-3'>
          <SettingsNav active='groups' />
        </div>

        <div className='col-xs-9'>
          <h2>Groups</h2>
          <GroupList />
        </div>
      </div>
    );
  }
}

module.exports = GroupManagementPage;
