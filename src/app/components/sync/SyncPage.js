import React from 'react';

import SyncedProtocolList from './SyncedProtocolList';
import ProtocolList from './ProtocolList';

class SyncPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      synced_protocols: [
        'protocol 1',
        'protocol 2',
        'protocol 3',
      ],
      owned_protocols: [
        'protocol 4',
        'protocol 5',
        'protocol 6',
        'protocol 7',
      ]
    };

    this.onSyncClick = this.onSyncClick.bind(this);
    this.onOwnedClick = this.onOwnedClick.bind(this);
  }

  onSyncClick(name) {
    let synced_protocols = this.state.synced_protocols;
    let owned_protocols = this.state.owned_protocols;
    let i = synced_protocols.indexOf(name);

    owned_protocols.push(synced_protocols[i]);
    owned_protocols.sort((a, b) => a.localeCompare(b))
    synced_protocols.splice(i, 1);
    this.setState({
      synced_protocols: synced_protocols,
      owned_protocols: owned_protocols
    });
  }

  onOwnedClick(name) {
    let synced_protocols = this.state.synced_protocols;
    let owned_protocols = this.state.owned_protocols;
    let i = owned_protocols.indexOf(name);

    synced_protocols.push(owned_protocols[i]);
    synced_protocols.sort((a, b) => a.localeCompare(b))
    owned_protocols.splice(i, 1);
    this.setState({
      synced_protocols: synced_protocols,
      owned_protocols: owned_protocols
    });
  }

  render() {
    let id = this.props.params.mdsId;
    let name = 'MDS ' + id;
    let link = 'http://mds' + id + '.com/api';

    return (
      <div className=''>
          <div className=''>
              <header className='mdsprotocol-heading'>
                  <h2>{name} Settings</h2>
              </header>

              <form className='mds-settings-form'>
                <label className='mds-settings-form-label'>
                  MDS Name<br />
                  <input type='text' value={name} />
                </label>
                <label>
                  MDS Link<br />
                  <input type='text' value={link} />
                </label>
              </form>

              <div className='mdsprotocol-list-container'>
                  <SyncedProtocolList protocols={this.state.synced_protocols} onItemClick={this.onSyncClick}/>
                  <ProtocolList protocols={this.state.owned_protocols} onItemClick={this.onOwnedClick}/>
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
