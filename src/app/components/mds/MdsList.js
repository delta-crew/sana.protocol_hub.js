import React from 'react';

import MdsListItem from './MdsListItem';

class MdsList extends React.Component {
  render() {
    let mds = this.props.mds;

    return (
      <div className='mds-list'>
        <div>
          {mds.map((mds) =>
            <MdsListItem key={mds.id} organizationId={mds.organization} name={mds.name} url={mds.url} id={mds.id} />
          )}
        </div>
      </div>
    );
  }
}

export default MdsList;
