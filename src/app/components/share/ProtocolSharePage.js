import React from 'react';

import OrganizationStore from '../../stores/OrganizationStore';
import ProtocolStore from '../../stores/ProtocolStore';
import OrganizationList from './OrganizationList';

class ProtocolSharePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      title: '',
      organizations: [],
      shared_organizations: {},
      selected_organizations: {},
    };

    this._onOrgFetch = this._onOrgFetch.bind(this);
    this._onProtocolFetch = this._onProtocolFetch.bind(this);
    this._onOrgClick = this._onOrgClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  _onOrgFetch() {
    this.setState({
      organizations: OrganizationStore.getAll(),
    });
  }

  _onProtocolFetch() {
    let id = Number(this.props.params.protocolId);
    let protocol = ProtocolStore.get(id);
    let shared_organizations = {};

    //protocol.organizations.forEach((id) => shared_organizations[id] = true);

    this.setState({
      user: protocol.user.first_name,
      title: protocol.title,
      shared_organizations: shared_organizations,
    });
  }

  _onOrgClick(id) {
    let selected_organizations = this.state.selected_organizations;

    if(selected_organizations[id]) selected_organizations[id] = false;
    else selected_organizations[id] = true;

    this.setState({
      selected_organizations: selected_organizations,
    });
  }

  componentWillMount() {
    ProtocolStore.addChangeListener(this._onProtocolFetch);
    OrganizationStore.addChangeListener(this._onOrgFetch);

    let id = Number(this.props.params.protocolId);
    ProtocolStore.fetchProtocol(id);
    OrganizationStore.fetchOrganizations();
  }

  handleSave(event) {
    let protocol_id = Number(this.props.params.protocolId);
    const version = ProtocolStore.get(protocol_id).version;
    Object.keys(this.state.selected_organizations).forEach((organization_id) => {
      ProtocolStore.addProtocolToOrganization(organization_id, protocol_id, version);
    });
    this.props.router.push(`/protocol/${protocol_id}`);
    event.preventDefault();
  }

  render() {
    return (
      <div className='add-mds-container'>
        <span className='protocol-list-item-name'>
          { this.state.user + ' / ' + this.state.title }
        </span>

        <OrganizationList
          organizations={this.state.organizations}
          shared_organizations={this.state.shared_organizations}
          selected_organizations={this.state.selected_organizations}
          onItemClick={this._onOrgClick}
        />

        <form className='add-organization-form' onSubmit={this.handleSave}>
          <button type='submit' className='btn btn-success'>
            <span className='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span>
            {' '}Save Configuration
          </button>
        </form>

        <div className='save-mds-button' onClick={this.handleSave}>
        </div>
      </div>
    );
  }
}

export default ProtocolSharePage;
