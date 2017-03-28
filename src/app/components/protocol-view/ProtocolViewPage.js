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

    this.builderUrl = BUILDER_URL;
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

  handlePublic(isPublic) {
    let id = Number(this.props.params.protocolId);
    ProtocolStore.updateProtocol(id, isPublic) ;
  }

  render() {
    let id = Number(this.props.params.protocolId);
    let versions = this.state.versions;
    if(!versions.length) {
      return <div>Oops! Looks like this protocol doesn't exist</div>
    }

    let scope = null;
    let publicButton = null;
    if (versions[versions.length-1].public) {
      scope = <span className="protocol-view-scope label label-info">Public</span>;
      publicButton =
        <a href=''
            onClick={this.handlePublic.bind(this, false)}
            className='btn btn-default btn-block'>
          <span
              className='glyphicon glyphicon-eye-close'
              aria-hidden='true'></span> Make Private
        </a>;
    } else {
      scope = <span className="protocol-view-scope label label-warning">Private</span>
      publicButton =
        <a href=''
            onClick={this.handlePublic.bind(this, true)}
            className='btn btn-default btn-block'>
          <span
              className='glyphicon glyphicon-eye-open'
              aria-hidden='true'></span> Make Public
        </a>;
    }

    let shared = null;
    if (versions[versions.length-1].shared_versions.length > 0) {
      shared = <span className="protocol-view-scope label label-info">Shared</span>
    }

    return (
      <div className='protocol-show'>
        <div className='row'>
          <div className='col-lg-12'>

            <div className='protocol-view-header vertical-align'>
              <div className='col-xs-8'>
                <span className='protocol-list-item-name'>
                  {//'delta / protocol' + this.props.params.protocolId
                    versions[0].user.first_name + ' / ' + versions[0].title
                  }
                </span>

                {scope}
                {shared}

                <span className='protocol-view-builder-link'>
                  <a href={this.builderUrl + '/en/procedures/' + id} target='_blank'>View in builder</a>
                </span>
              </div>

              <div className='col-xs-2'>
                {publicButton}
              </div>

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
