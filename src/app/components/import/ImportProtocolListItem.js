import React from 'react';

class ImportProtocolListItem extends React.Component {
  render() {
    let disabled = this.props.imported;
    let importText = this.props.imported ? "Imported" : "Import";

    return (
      <div className="import-protocol-list-item">
          <span className="import-protocol-list-item-name">
              {this.props.name}
          </span>
          <span className="import-protocol-list-item-import">
              <button type="button" disabled={disabled}>{importText}</button>
          </span>
      </div>
    );
  }
}

module.exports = ImportProtocolListItem;
