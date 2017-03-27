import React from 'react';
import { Link } from 'react-router';

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

    this._onLoad = this._onLoad.bind(this);
  }

  _onLoad() {
    this.setState({
      protocols: ProtocolStore.getLatest(),
    });
  }

  componentWillMount() {
    ProtocolStore.addChangeListener(this._onLoad);
    ProtocolStore.fetchProtocols();
  }

  componentWillUnmount() {
    ProtocolStore.removeChangeListener(this._onLoad);
  }

  render() {
    return (
      <div className='home-page'>
        <div className='row vertical-align'>
          <div className='col-xs-10'>
            <h2>Your Protocols</h2>
          </div>

          <div className='col-xs-2'>
            <Link to='/mds' className='sync-btn' className='btn btn-success btn-block'>
              <span className='glyphicon glyphicon-cloud' aria-hidden='true'></span> Sync
            </Link>
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
