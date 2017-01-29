import React from 'react';

import ProtocolViewBodySwitcher from './ProtocolViewBodySwitcher';

class ProtocolViewPage extends React.Component {
  render() {
    return (
      <div className='row'>
          <div className='col-lg-12'>
              <div id='protocol-view-container'>
                  <div id='protocol-view-header'>
                      <span id='protocol-view-author'>delta</span>
                      /
                      <span id='protocol-view-title'>protocol1</span>
                      <span id='protocol-view-scope'>Private</span>
                      <span id='protocol-view-builder-link'>
                          <a href='#'>View in builder</a>
                      </span>
                  </div>
                  <div id='protocol-view-body'>
                      <ProtocolViewBodySwitcher />
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

module.exports = ProtocolViewPage;
