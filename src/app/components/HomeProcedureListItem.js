import React from 'react';

class HomeProcedureListItem extends React.Component {
  render() {
    return (
      <div>
          <h3>{this.props.name}</h3>
          <a href=''>Edit</a>
      </div>
    );
  }
}

module.exports = HomeProcedureListItem;
