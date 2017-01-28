import React from 'react';

class MdsProcedureListItem extends React.Component {
  render() {
    var className = this.props.selected ? "mdsprocedure-item-selected" : "mdsprocedure-item";

    return (
      <div className={className}>
          <h3>{this.props.name}</h3>
      </div>
    );
  }
}

module.exports = MdsProcedureListItem;
