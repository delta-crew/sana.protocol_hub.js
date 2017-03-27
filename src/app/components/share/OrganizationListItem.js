import React from 'react';

class OrganizationListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if(this.props.shared) return;
    this.props.onClick(this.props.id);
  }

  render() {
    let shared = (this.props.shared ? '-shared' : '');
    let selected = (this.props.selected ? '-selected' : '');
    let className = 'organization-list-item' + selected;

    return (
      <div className={className} onClick={this.handleClick}>
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

export default OrganizationListItem;
