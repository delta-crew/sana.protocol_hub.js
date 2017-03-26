import React from 'react';
import { browserHistory } from 'react-router';

import OrganizationStore from '../stores/OrganizationStore';
import OrganizationActionCreator from '../actionCreators/OrganizationActionCreator';
import Dropdown from './Dropdown';

class OrganizationSwitcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      organizations: [],
    };

    this._onChange = this._onChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  _onChange() {
    let organizations = OrganizationStore.getAll();
    this.setState({
      organizations: organizations,
    });
  }

  componentWillMount() {
    OrganizationStore.addChangeListener(this._onChange);
    OrganizationStore.fetchOrganizations();
  }

  componentWillUnmount() {
    OrganizationStore.removeChangeListener(this._onChange);
  }

  _onSelect(organization) {
    if(organization.link) {
      browserHistory.push('/new/organization');
    } else {
      OrganizationActionCreator.switchActiveOrg(organization.id);
    }
  }

  render() {
    let organizations = this.state.organizations.map((organization) => {
      return {
        name: organization.name,
        id: organization.id,
        link: false,
      };
    });

    organizations.push({
      name: 'Create Organization',
      link: true,
    });

    const active = OrganizationStore.getActiveOrg();
    let selected = {};
    if (active) {
      selected = {
        name: active.name,
        id: active.id,
      };
    }

    return (
      <Dropdown list={organizations} selected={selected} onSelect={this._onSelect} />
    );
  }
}

export default OrganizationSwitcher;
