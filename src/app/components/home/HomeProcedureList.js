import React from 'react';

import HomeProcedureListItem from './HomeProcedureListItem';

class HomeProcedureList extends React.Component {
  render() {
    return (
      <div id='home-procedure-list'>
        <div>
          <HomeProcedureListItem name='Protocol 1' protocolId={1} />
          <HomeProcedureListItem name='Protocol 2' protocolId={2}/>
          <HomeProcedureListItem name='Protocol 3' protocolId={3} />
          <HomeProcedureListItem name='Protocol 4' protocolId={4} />
        </div>
      </div>
    );
  }
}

module.exports = HomeProcedureList;
