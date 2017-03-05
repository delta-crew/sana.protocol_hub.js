import React from 'react';

import ProtocolStore from '../../stores/ProtocolStore';
import ProtocolViewBodySwitcher from './ProtocolViewBodySwitcher';

class ProtocolViewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      versions: []
    }
  }

  _onLoad() {
    let versions = ProtocolStore.getAllVersions(this.props.params.protocolId);

    this.setState({
      versions: versions,
    })
  }

  componentWillMount() {
    ProtocolStore.addChangeListener(this._onLoad);
    // fetch Mds
  }

  componentWillUnmount() {
    ProtocolStore.removeChangeListener(this._onLoad);
  }

  render() {
    let versions = this.state.versions;
    if(!versions.length) {
      return <div>Oops! Looks like this protocol doesn't exist</div>
    }

    let scope = null;
    if (versions[0].private) {
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
                {//'delta / protocol' + this.props.params.protocolId
                  protocol[0].name
                }
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
