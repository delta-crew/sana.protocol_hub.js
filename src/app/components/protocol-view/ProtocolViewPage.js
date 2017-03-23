import React from 'react';

import ProtocolStore from '../../stores/ProtocolStore';
import ProtocolViewBodySwitcher from './ProtocolViewBodySwitcher';

class ProtocolViewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      revisions: ProtocolStore.getAllRevisions(1),
    }
  }

  _onLoad() {
    let revisions = ProtocolStore.getAllRevisions(this.props.params.protocolId);

    this.setState({
      revisions: revisions,
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
    let revisions = this.state.revisions;
    if(!revisions.length) {
      return <div>Oops! Looks like this protocol doesn't exist</div>
    }

    let scope = null;
    if (revisions[0].private) {
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
                  revisions[0].owner + ' / ' + revisions[0].name
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
              <ProtocolViewBodySwitcher revisions={revisions} currentRevision={revisions[0]}/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

module.exports = ProtocolViewPage;
