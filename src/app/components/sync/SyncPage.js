import React from 'react';

import MdsStore from '../../stores/MdsStore';
import ProtocolStore from '../../stores/ProtocolStore';
import OrganizationStore from '../../stores/OrganizationStore';
import SyncedProtocolList from './SyncedProtocolList';
import ProtocolList from './ProtocolList';

class SyncPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mdsId: parseInt(this.props.params.mdsId, 10),
      orgId: parseInt(this.props.params.organizationId, 10),
      synced_protocols: [],
      org_protocols: [],
      og_mds_name: '',
      mds_name: '',
      mds_link: '',
    };

    this.handleMdsName = this.handleMdsName.bind(this);
    this.handleMdsLink = this.handleMdsLink.bind(this);
    this.onSyncClick = this.onSyncClick.bind(this);
    this.onOrgClick = this.onOrgClick.bind(this);

    this._loadMds = this._loadMds.bind(this);
    this._loadProtocols = this._loadProtocols.bind(this);
    this._synchronizeMds = this._synchronizeMds.bind(this);
    this._saveMdsSettings = this._saveMdsSettings.bind(this);
  }

  _loadMds() {
    const { mdsId } = this.state;
    let mds = MdsStore.get(mdsId);

    this.setState({
      og_mds_name: mds.name,
      mds_name: mds.name,
      mds_link: mds.url,
    });
  }

  _loadProtocols() {
    let protocols = ProtocolStore.getAll();
    let synced_protocols = MdsStore.getSynchronizedProtocols(this.state.mdsId).map(p => {
      const org_protocol = ProtocolStore.get(p.protocol.id)

      return Object.assign({
        willUpdate: p.synchronized_version < (org_protocol ? org_protocol.version : 0),
      }, p.protocol);
    });
    let org_protocols = protocols.filter((protocol) => {
      let i = synced_protocols.findIndex((synced_protocol) => {
        return synced_protocol.id === protocol.id;
      });

      return i === -1;
    });

    this.setState({
      synced_protocols: synced_protocols,
      org_protocols: org_protocols,
    });
  }

  componentWillMount() {
    const { mdsId, orgId } = this.state;

    MdsStore.addChangeListener(this._loadMds);
    MdsStore.addChangeListener(this._loadProtocols);
    ProtocolStore.addChangeListener(this._loadProtocols);

    MdsStore.fetchMds(orgId, mdsId);
    MdsStore.fetchSyncedProtocols(orgId, mdsId);
    ProtocolStore.fetchOrganizationProtocols(orgId);
  }

  componentWillUnmount() {
    MdsStore.removeChangeListener(this._loadMds);
    MdsStore.removeChangeListener(this._loadProtocols);
    ProtocolStore.removeChangeListener(this._loadProtocols);
  }

  handleMdsName(event) {
    this.setState({
      mds_name: event.target.value,
    });
  }

  handleMdsLink(event) {
    this.setState({
      mds_link: event.target.value,
    });
  }

  onSyncClick(id) {
    const { orgId, mdsId } = this.state;
    let synced_protocols = this.state.synced_protocols;
    let org_protocols = this.state.org_protocols;
    let i = synced_protocols.findIndex(p => p.id === id);

    let p = synced_protocols[i];

    org_protocols.push(p);
    synced_protocols.splice(i, 1);
    synced_protocols.sort((a, b) => a.id - b.id);
    this.setState({
      synced_protocols: synced_protocols,
      org_protocols: org_protocols
    });

    MdsStore.removeSyncedProtocol(orgId, mdsId, p.id);
  }

  onOrgClick(id) {
    const { orgId, mdsId } = this.state;
    let synced_protocols = this.state.synced_protocols;
    let org_protocols = this.state.org_protocols;
    let i = org_protocols.findIndex(p => p.id === id);

    let p = org_protocols[i];

    synced_protocols.push(org_protocols[i]);
    org_protocols.splice(i, 1);
    synced_protocols.sort((a, b) => a.id - b.id);
    this.setState({
      synced_protocols: synced_protocols,
      org_protocols: org_protocols
    });

    MdsStore.createSyncedProtocol(orgId, mdsId, p.id);
  }

  _synchronizeMds(e) {
    const { mdsId, orgId } = this.state;
    MdsStore.synchronize(orgId, mdsId).then(() => {
      MdsStore.fetchSyncedProtocols(orgId, mdsId);
    });
    e.preventDefault();
  }

  _saveMdsSettings(e) {
    const { mdsId, orgId, mds_name: name, mds_link: url } = this.state;
    MdsStore.updateMds(orgId, mdsId, name, url);
    e.preventDefault();
  }

  render() {
    return (
      <div className=''>
          <div className=''>
              <header className='mdsprotocol-heading'>
                  <h2>{this.state.og_mds_name} Settings</h2>
              </header>

              <form className='mds-settings-form'>
                <label className='mds-settings-form-label'>
                  MDS Name<br />
                  <input type='text' value={this.state.mds_name} onChange={this.handleMdsName} />
                </label>
                <label>
                  MDS Link<br />
                  <input type='text' value={this.state.mds_link} onChange={this.handleMdsLink} />
                </label>
              </form>

              <div className='mdsprotocol-list-container'>
                  <SyncedProtocolList protocols={this.state.synced_protocols} onItemClick={this.onSyncClick}/>
                  <ProtocolList protocols={this.state.org_protocols} onItemClick={this.onOrgClick}/>
              </div>

              <div className='mdsprotocol-buttons'>
                <a href='#' className='btn' onClick={this._synchronizeMds}>
                  <span className='glyphicon glyphicon-cloud' aria-hidden='true'></span> Sync to MDS
                </a>
                <a href='#' className='btn btn-success' onClick={this._saveMdsSettings}>
                  <span className='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span> Save Changes
                </a>
              </div>
          </div>
      </div>
    );
  }
}

module.exports = SyncPage;
