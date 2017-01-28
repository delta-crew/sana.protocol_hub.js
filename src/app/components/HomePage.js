import React from 'react';

import HomeProcedureList from './HomeProcedureList';

class HomePage extends React.Component {
  render() {
    return (
      <div>
          <div className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>
                  User<span className='caret'></span>
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

          <a href='/sync' className='sync-btn' className='btn btn-secondary'>
              <span className='glyphicon glyphicon-cloud' aria-hidden='true'></span>Sync
          </a>
          <a href='' id='import-btn' className='btn btn-success'>
              <span className='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span>Import
          </a>
      </div>
    );
  }
}

module.exports = HomePage;
