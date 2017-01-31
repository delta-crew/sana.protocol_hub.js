import React from 'react';

import MdsList from './MdsList';
import ProtocolList from './ProtocolList';

class SyncPage extends React.Component {
  render() {
    return (
      <div className=''>
          <div className=''>
              <header className='mdsprotocol-heading'>
                  <h2>MDS Protocol Settings</h2>
              </header>

              <div className='mdsprotocol-list-container'>
                  <MdsList />
                  <ProtocolList />
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
