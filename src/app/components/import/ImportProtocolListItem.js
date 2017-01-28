import React from 'react';

class ImportProtocolListItem extends React.Component {
  render() {
    let disabled = this.props.imported;
    let importText = this.props.imported ? "Imported" : "Import";

    return (
      <div className="import-protocol-list-item row">
        <span className="import-protocol-list-item-name col-xs-9">
          {this.props.name}
        </span>
        <span className="import-protocol-list-item-import col-xs-3">
          <button type="button" className="btn btn-default btn-block" disabled={disabled}>
            {importText}
          </button>
        </span>
      </div>
    );
  }
}

module.exports = ImportProtocolListItem;
