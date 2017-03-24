import React from 'react';
import { Link } from 'react-router';

class SettingsNav extends React.Component {
  render() {
    let active = this.props.active;

    return (
      <div className='list-group settings-navbar'>
        <ul className='nav nav-pills nav-stacked'>
          <h4 className='heading'>Organization Settings</h4>
          <li role='presentation' className={active === 'members' ? 'active' : ''}>
            <Link to='/settings/members' className='settings-nav-item'>
              Members
            </Link>
          </li>
          <li role='presentation' className={active === 'groups' ? 'active' : ''}>
            <Link to='/settings/groups' className='settings-nav-item'>
              Groups
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

module.exports = SettingsNav;
