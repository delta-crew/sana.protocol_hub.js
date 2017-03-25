import React from 'react';
import { Link } from 'react-router';

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
        <div className='row mds-header'>
          <div className='col-xs-8'>
            <h2>Your MDS's</h2>
          </div>
        </div>

        <div className='col-xs-2 mds-add-btn'>
          <Link to='/new' className='btn btn-success btn-block'>
            <span className='glyphicon glyphicon-plus' aria-hidden='true'></span> Add
          </Link>
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
