import React from 'react';

class UserManagementPage extends React.Component {
  render() {
    return (
      <div className="row">
          <div className="col-lg-12">
              <header id="mdsprocedures-heading">
                  <h2>MDS Procedures Settings</h2>
              </header>

              <div id="mdsprocedure-list-container">
                  <MdsList />
                  <ProcedureList />
              </div>

              <a href="" id="sync-btn" className="btn btn-secondary">
                  <span className="glyphicon glyphicon-cloud" aria-hidden="true"></span>Sync to MDS
              </a>
              <a href="" id="save-changes-btn" className="btn btn-success">
                  <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>Save Changes
              </a>
          </div>
      </div>
    );
  }
}

module.exports = UserManagementPage;
