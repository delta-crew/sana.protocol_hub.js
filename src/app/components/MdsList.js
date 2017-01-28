import React from 'react';

import MdsProcedureListToolbar from './MdsProcedureListToolbar';
import MdsProcedureListItem from './MdsProcedureListItem';

class MdsList extends React.Component {
  render() {
    return (
      <div id='mds-list'>
          <h2>MDS's</h2>
          <MdsProcedureListToolbar />
          <div className='mdsprocedure-item-group'>
              <MdsProcedureListItem name='MDS 1' selected={true} />
              <MdsProcedureListItem name='MDS 2' selected={false} />
              <MdsProcedureListItem name='MDS 3' selected={false} />
          </div>
      </div>
    );
  }
}

module.exports = MdsList;
