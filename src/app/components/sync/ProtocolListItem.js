import React from 'react';

class ProtocolListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick(this.props.id);
  }

  render() {
    let className = 'mdsprotocol-item';

    if (this.props.willUpdate) {
      className = className + ' will-update';
    }

    return (
      <div className={className} onClick={this.handleClick}>
        <h3>
          {this.props.title}
          {this.props.willUpdate && (
            <span className="update-caption"> (unsynchronized changes)</span>
          )}
        </h3>
      </div>
    );
  }
}

module.exports = ProtocolListItem;
