import React from 'react';
import { map } from 'lodash';

import MemberListItem from './MemberListItem';

class MemberList extends React.Component {
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
    let users = ['mstobo', 'tophelders', 'jrogers'];

    return (
      <div className='member-list'>
        <form>
          <input type='text' value={this.state.filter} onChange={this.handleFilter} />
        </form>
        <h2>Total {users.length}</h2>
        {map(users, (user) => <MemberListItem member={user} />)}
      </div>
    );
  }
}

module.exports = MemberList;
