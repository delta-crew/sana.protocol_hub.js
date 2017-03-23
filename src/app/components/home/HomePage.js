import React from 'react';

import ProtocolStore from '../../stores/ProtocolStore';
import OrganizationStore from '../../stores/OrganizationStore';
import OrganizationSwitcher from '../OrganizationSwitcher';
import HomeProtocolList from './HomeProtocolList';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      protocols: ProtocolStore.getLatest(),
    }
  }

  _onLoad() {
    let results = ProtocolStore.getLatest();
    this.setState({
      protocols: protocols
    });
  }

  componentWillMount() {
    ProtocolStore.addChangeListener(this._onLoad);
    // fetch Protcols
  }

  componentWillUnmount() {
    ProtocolStore.removeChangeListener(this._onLoad);
  }

  render() {
    return (
      <div className='home-page'>
        <div className='row'>
          <div className='col-lg-12'>
            <OrganizationSwitcher />
          </div>
        </div>

        <div className='row vertical-align'>
          <div className='col-xs-8'>
            <h2>Protocols</h2>
          </div>

          <div className='col-xs-2'>
            <a href='/mds' className='sync-btn' className='btn btn-default btn-block'>
              <span className='glyphicon glyphicon-cloud' aria-hidden='true'></span> Sync
            </a>
          </div>

          <div className='col-xs-2'>
            <a href='/import' id='import-btn' className='btn btn-success btn-block'>
              <span className='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span> Import
            </a>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <HomeProtocolList protocols={this.state.protocols}/>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = HomePage;
