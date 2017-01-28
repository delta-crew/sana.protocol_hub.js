import React from 'react';

import MdsProcedureListToolbar from './MdsProcedureListToolbar';
import MdsProcedureListItem from './MdsProcedureListItem';

class ProcedureList extends React.Component {
  render() {
    return (
      <div id='procedure-list'>
          <h2>Procedures</h2>
          <MdsProcedureListToolbar />
          <div className='mdsprocedure-item-group'>
              <MdsProcedureListItem name='Procedure 1' selected={true} />
              <MdsProcedureListItem name='Procedure 2' selected={false} />
              <MdsProcedureListItem name='Procedure 3' selected={true} />
              <MdsProcedureListItem name='Procedure 4' selected={true} />
          </div>
      </div>
    );
  }
}

module.exports = ProcedureList;
