import React from 'react';

class SettingsNav extends React.Component {
  render() {
    let active = this.props.active;

    return (
      <div className='list-group settings-navbar'>
          <h4 className='heading'>Personal Settings</h4>
          <a href='/settings/profile' className={'settings-nav-item ' + active === 'profile ' ? 'active' : ''}>
              Profile
          </a>
          <h4 className='heading'>Orginization Settings</h4>
          <a href='/settings/members' className={'settings-nav-item ' + active === 'members' ? 'active' : ''}>
              Members
          </a>
          <a href='/settings/groups' className={'settings-nav-item ' + active === 'groups' ? 'active' : ''}>
              Groups
          </a>
          <a href='/settings/mds-links' className={'settings-nav-item ' + active === 'mds-links' ? 'active' : ''}>
              MDS Links
          </a>
      </div>
    );
  }
}

module.exports = SettingsNav;
