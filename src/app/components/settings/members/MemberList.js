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
    const { organization } = this.props;
    return (
      <div className='member-list'>
        <form>
          <input type='text' value={this.state.filter} onChange={this.handleFilter} />
        </form>
        {map(this.props.users, (user, i) => <MemberListItem key={i} organization={organization} member={user} />)}
      </div>
    );
  }
}

export default MemberList;
