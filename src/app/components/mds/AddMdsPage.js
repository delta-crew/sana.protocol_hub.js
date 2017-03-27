import React from 'react';
import { browserHistory } from 'react-router';

import OrganizationSwitcher from '../OrganizationSwitcher';
import OrganizationStore from '../../stores/OrganizationStore';
import MdsStore from '../../stores/MdsStore';

class AddMdsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mds_name: '',
      mds_link: '',
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleMdsName = this.handleMdsName.bind(this);
    this.handleMdsLink = this.handleMdsLink.bind(this);
  }

  handleSave(event) {
    let id = OrganizationStore.getActiveOrgId();
    if(id) {
      MdsStore.createMds(id, this.state.mds_name, this.state.mds_link);
      browserHistory.push('/mds');
    }
  }

  handleMdsName(event) {
    this.setState({
      mds_name: event.target.value,
    });
  }

  handleMdsLink(event) {
    this.setState({
      mds_link: event.target.value,
    });
  }

  render() {
    return (
      <div className='add-mds-container'>
        <div className='add-mds-heading'>
          <h2>Add an MDS</h2>
        </div>

        <OrganizationSwitcher />

        <form className='add-mds-form'>
          <label className='add-mds-form-label'>
            MDS Name<br />
            <input type='text' size='100' value={this.state.mds_name} onChange={this.handleMdsName} />
          </label>
          <label>
            MDS Link<br />
            <input type='text' size='100' value={this.state.mds_link} onChange={this.handleMdsLink} />
          </label>
        </form>

        <div className='save-mds-button' onClick={this.handleSave}>
          <a href='#' className='btn btn-success'>
            <span className='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span> Save MDS
          </a>
        </div>
      </div>
    );
  }
}

export default AddMdsPage;
