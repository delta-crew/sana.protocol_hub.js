import React from 'react';

import OrganizationListItem from './OrganizationListItem';

class OrganizationList extends React.Component {
  render() {
    let shared_organizations = this.props.shared_organizations;
    let selected_organizations = this.props.selected_organizations;

    return (
      <div className='mdsprotocol-list-outer'>
        <div className='mdsprotocol-list-inner'>
          <div className='mdsprotocol-item-group'>
            {this.props.organizations.map((organization) =>
              <OrganizationListItem
                key={organization.id}
                id={organization.id}
                name={organization.name}
                shared={shared_organizations[organization.id]}
                selected={selected_organizations[organization.id]}
                onClick={this.props.onItemClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default OrganizationList;
