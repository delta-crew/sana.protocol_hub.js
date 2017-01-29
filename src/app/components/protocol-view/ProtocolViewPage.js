import React from 'react';

import ProtocolViewBodySwitcher from './ProtocolViewBodySwitcher';

class ProtocolViewPage extends React.Component {
  render() {
    let scope = null;
    if (this.props.params.protocolId == 1) {
      scope = <span className="protocol-view-scope label label-warning">Private</span>
    } else {
      scope = <span className="protocol-view-scope label label-info">Public</span>
    }

    return (
      <div className='protocol-show'>
        <div className='row'>
          <div className='col-lg-12'>

            <div className='protocol-view-header vertical-align'>
              <span className='protocol-list-item-name'>
                {'delta / protocol' + this.props.params.protocolId}
              </span>

              {scope}

              <span className='protocol-view-builder-link'>
                <a href='#'>View in builder</a>
              </span>
            </div>

          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>

            <div className='protocol-view-body'>
              <ProtocolViewBodySwitcher />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

module.exports = ProtocolViewPage;
