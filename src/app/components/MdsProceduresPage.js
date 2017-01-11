import React from 'react';
import MdsList from './MdsList';
import ProcedureList from './ProcedureList';

class MdsProceduresPage extends React.Component {
  render() {
    return (
      <div class="row">
          <div class="col-lg-12">
              <header id="mdsprocedures-heading">
                  <h2>MDS Procedures Settings</h2>
              </header>

              <div id="mdsprocedure-list-container">
                  <MdsList />
                  <ProcedureList />
              </div>

              <a href="" id="sync-btn" class="btn btn-secondary">
                  <span class="glyphicon glyphicon-cloud" aria-hidden="true"></span>Sync to MDS
              </a>
              <a href="" id="save-changes-btn" class="btn btn-success">
                  <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>Save Changes
              </a>
          </div>
      </div>
    );
  }
}

module.exports = MdsProceduresPage;
