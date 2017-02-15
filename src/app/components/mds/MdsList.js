import React from 'react';

import MdsListItem from './MdsListItem';

class MdsList extends React.Component {
  render() {
    let mds_list = [
      {name: 'MDS 1', link: 'http://mds1.com/api', id: 1},
      {name: 'MDS 2', link: 'http://mds2.com/api', id: 2},
      {name: 'MDS 3', link: 'http://mds3.com/api', id: 3},
      {name: 'MDS 4', link: 'http://mds4.com/api', id: 4},
    ];

    return (
      <div className='mds-list'>
        <div>
          {mds_list.map((mds) => <MdsListItem name={mds.name} link={mds.link} id={mds.id} key={mds.id} />)}
        </div>
      </div>
    );
  }
}

module.exports = MdsList;
