import React from 'react';

import OrganizationStore from '../../../stores/OrganizationStore';

class AddOrganizationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleName = this.handleName.bind(this);
  }

  handleSave(event) {
    OrganizationStore.createOrganization(this.state.name);
  }

  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  render() {
    return (
      <div className='add-mds-container'>
        <div className='add-mds-heading'>
          <h2>Create an Organization</h2>
        </div>

        <form className='add-organization-form'>
          <label className='add-mds-form-label'>
            Name<br />
            <input type='text' size='100' value={this.state.name} onChange={this.handleName} />
          </label>
        </form>

        <div className='save-mds-button' onClick={this.handleSave}>
          <a href='#' className='btn btn-success'>
            <span className='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span> Save Organization
          </a>
        </div>
      </div>
    );
  }
}

export default AddOrganizationPage;
