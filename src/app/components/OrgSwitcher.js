import React from 'react';

import OrganizationStore from '../stores/OrganizationStore';
import OrganizationActionCreator from '../actionCreators/OrganizationActionCreator';
import Dropdown from './Dropdown';

class OrgSwitcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      organizations: OrganizationStore.getAll(),
    }

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
    //fetch
  }

  componentWillUnmount() {
    OrganizationStore.removeChangeListener(this._onChange);
  }

  _onSelect(organization) {
    OrganizationActionCreator.switchActiveOrg(organization.id);
  }

  render() {
    let organizations = this.state.organizations.map((organization) => {
      return {
        name: organization.name,
        id: organization.id,
      };
    });

    let active = OrganizationStore.getActiveOrg();
    let selected = {
      name: active.name,
      id: active.id,
    };

    return (
      <Dropdown list={organizations} selected={selected} onSelect={this._onSelect} />
    );
  }
}

export default OrgSwitcher;
