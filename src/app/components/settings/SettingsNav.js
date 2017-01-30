import React from 'react';

class SettingsNav extends React.Component {
  render() {
    let active = this.props.active;

    return (
      <div className='list-group settings-navbar'>
        <ul className='nav nav-pills nav-stacked'>
          <h4 className='heading'>Personal Settings</h4>
          <li role='presentation' className={active === 'profile' ? 'active' : ''}>
            <a href='#' className='settings-nav-item'>
              Profile
            </a>
          </li>
          <h4 className='heading'>Organization Settings</h4>
          <li role='presentation' className={active === 'members' ? 'active' : ''}>
            <a href='/settings/members' className='settings-nav-item'>
              Members
            </a>
          </li>
          <li role='presentation' className={active === 'groups' ? 'active' : ''}>
            <a href='/settings/groups' className='settings-nav-item'>
              Groups
            </a>
          </li>
          <li role='presentation' className={active === 'mds-links' ? 'active' : ''}>
            <a href='#' className='settings-nav-item'>
              MDS Links
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

module.exports = SettingsNav;
