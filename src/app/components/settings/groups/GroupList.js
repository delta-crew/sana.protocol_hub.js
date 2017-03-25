import React from 'react';
import { map } from 'lodash';

import GroupListItem from './GroupListItem';

class GroupList extends React.Component {
  constructor() {
    super();

    this.state = {
      filter: ''
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(event) {
    this.setState({filter: event.target.value});
  }

  render() {
    let groups = [
      {name: 'Admins', permissions: {}, members: ['a', 'b']},
      {name: 'Members', permissions: {}, members: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']},
      {name: 'Coops', permissions: {}, members: ['a', 'b', 'c']}
    ];

    return (
      <div className='member-list'>
        <form>
          <input type='text' value={this.state.filter} onChange={this.handleFilter} />
        </form>
        {map(groups, (group, i) => <GroupListItem key={i} group={group} />)}
      </div>
    );
  }
}

module.exports = GroupList;
