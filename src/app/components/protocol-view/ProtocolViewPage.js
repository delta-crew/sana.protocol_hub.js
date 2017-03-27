import React from 'react';
import { Link } from 'react-router';

import ProtocolStore from '../../stores/ProtocolStore';
import ProtocolViewBodySwitcher from './ProtocolViewBodySwitcher';

class ProtocolViewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      versions: [],
    }

    this._onLoad = this._onLoad.bind(this);
  }

  _onLoad() {
    let id = Number(this.props.params.protocolId);
    let versions = ProtocolStore.getAllVersions(id);

    this.setState({
      versions: versions,
    });
  }

  componentWillMount() {
    ProtocolStore.addChangeListener(this._onLoad);
    let id = Number(this.props.params.protocolId);
    ProtocolStore.fetchProtocolVersions(id);
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
    if (versions[0].public) {
      scope = <span className="protocol-view-scope label label-info">Public</span>
    } else {
      scope = <span className="protocol-view-scope label label-warning">Private</span>
    }

    return (
      <div className='protocol-show'>
        <div className='row'>
          <div className='col-lg-12'>

            <div className='protocol-view-header vertical-align'>
              <span className='protocol-list-item-name'>
                {//'delta / protocol' + this.props.params.protocolId
                  versions[0].user.first_name + ' / ' + versions[0].title
                }
              </span>

              {scope}

              <span className='protocol-view-builder-link'>
                <a href='#'>View in builder</a>
              </span>

              <div className='col-xs-2'>
                <Link to={'/share/' + versions[0].id} className='sync-btn' className='btn btn-default btn-block'>
                  <span className='glyphicon glyphicon-share-alt' aria-hidden='true'></span> Share
                </Link>
              </div>

            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>

            <div className='protocol-view-body'>
              <ProtocolViewBodySwitcher versions={versions} currentVersion={versions[0]}/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

module.exports = ProtocolViewPage;
