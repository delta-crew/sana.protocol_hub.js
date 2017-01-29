import React from 'react';

import HomeProcedureList from './HomeProcedureList';

class HomePage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-8">
          <div className='dropdown'>
            <a href='#' className='dropdown-toggle btn btn-primary'>
              User <span className='caret'></span>
            </a>
            <ul className='dropdown-menu'>
              <li><a>User</a></li>
              <li role='separator' className='divider'></li>
              <li><a>Orginization</a></li>
            </ul>
          </div>

          <div>
            <h2>Your Protocols</h2>
          </div>

          <HomeProcedureList />
        </div>

        <div className="col-xs-2">
          <a href='/sync' className='sync-btn' className='btn btn-default btn-block'>
            <span className='glyphicon glyphicon-cloud' aria-hidden='true'></span> Sync
          </a>
        </div>
        <div className="col-xs-2">
          <a href='/import' id='import-btn' className='btn btn-success btn-block'>
            <span className='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span> Import
          </a>
        </div>
      </div>
    );
  }
}

module.exports = HomePage;
