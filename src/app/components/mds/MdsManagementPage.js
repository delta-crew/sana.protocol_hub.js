import React from 'react';

import MdsStore from '../../stores/MdsStore';
import MdsList from './MdsList';

class MdsManagementPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mds: MdsStore.getAll()
    }
  }

  render() {
    return (
      <div className='mds-page'>
        <div className='row vertical-align'>
          <div className='col-xs-8'>
            <h2>Your MDS's</h2>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <MdsList mds={this.state.mds}/>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = MdsManagementPage;
