import React from 'react';
import { Link } from 'react-router';

import OrganizationSwitcher from '../OrganizationSwitcher';
import MdsStore from '../../stores/MdsStore';
import OrganizationStore from '../../stores/OrganizationStore';
import MdsList from './MdsList';

class MdsManagementPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mds: [],
    }

    this._onMdsFetch = this._onMdsFetch.bind(this);
    this._onOrgChange = this._onOrgChange.bind(this);
  }

  _onOrgChange() {
    let id = OrganizationStore.getActiveOrgId();
    if(id) {
      MdsStore.listMds(id);
    }
  }

  _onMdsFetch() {
    this.setState({
      mds: MdsStore.getAll()
    });
  }

  componentWillMount() {
    OrganizationStore.addChangeListener(this._onOrgChange);
    MdsStore.addChangeListener(this._onMdsFetch);

    let id = OrganizationStore.getActiveOrgId();
    if(id) {
      MdsStore.listMds(id);
    }
  }

  componentWillUnmount() {
    MdsStore.removeChangeListener(this._onMdsFetch);
    OrganizationStore.removeChangeListener(this._onOrgChange);
  }

  render() {
    return (
      <div className='mds-page'>
        <div className='row mds-header'>
          <div className='col-xs-8'>
            <h2>Your MDS's</h2>
          </div>
        </div>

        <OrganizationSwitcher />

        <div className='col-xs-2 mds-add-btn'>
          <Link to='/new/mds' className='btn btn-success btn-block'>
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

export default MdsManagementPage;
