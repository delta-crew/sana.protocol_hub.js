import React from 'react';

import MdsStore from '../../stores/MdsStore';
import ProtocolStore from '../../stores/ProtocolStore';
import SyncedProtocolList from './SyncedProtocolList';
import ProtocolList from './ProtocolList';

class SyncPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  _loadMds() {
    let mds = MdsStore.get(this.props.params.mdsId);

    this.setState({
      og_mds_name: mds.name,
      mds_name: mds.name,
      mds_link: mds.link,
    });

    // fetch mds protocols
    // fetch all protocols
  }

  _loadProtocols() {
    let protocols = ProtocolStore.getAll();
    let synced_protocols = MdsStore.get(this.props.mdsId).synced_protocols;
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
    MdsStore.addChangeListener(this._loadMds);
    ProtocolStore.addChangeListener(this._loadProtocols);
    // fetch Mds
  }

  componentWillUnmount() {
    MdsStore.removeChangeListener(this._loadMds);
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

  onSyncClick(name) {
    let synced_protocols = this.state.synced_protocols;
    let org_protocols = this.state.org_protocols;
    let i = synced_protocols.indexOf(name);

    org_protocols.push(synced_protocols[i]);
    org_protocols.sort((a, b) => a.localeCompare(b))
    synced_protocols.splice(i, 1);
    this.setState({
      synced_protocols: synced_protocols,
      org_protocols: org_protocols
    });
  }

  onOrgClick(name) {
    let synced_protocols = this.state.synced_protocols;
    let org_protocols = this.state.org_protocols;
    let i = org_protocols.indexOf(name);

    synced_protocols.push(org_protocols[i]);
    synced_protocols.sort((a, b) => a.localeCompare(b))
    org_protocols.splice(i, 1);
    this.setState({
      synced_protocols: synced_protocols,
      org_protocols: org_protocols
    });
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
                <a href='' className='btn'>
                  <span className='glyphicon glyphicon-cloud' aria-hidden='true'></span> Sync to MDS
                </a>
                <a href='' className='btn btn-success'>
                  <span className='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span> Save Changes
                </a>
              </div>
          </div>
      </div>
    );
  }
}

module.exports = SyncPage;
