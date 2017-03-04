import React from 'react';

import MdsListItem from './MdsListItem';

class MdsList extends React.Component {
  render() {
    let mds = this.props.mds;

    return (
      <div className='mds-list'>
        <div>
          {mds.map((mds) =>
            <MdsListItem key={mds.id} name={mds.name} link={mds.link} id={mds.id} />
          )}
        </div>
      </div>
    );
  }
}

module.exports = MdsList;
