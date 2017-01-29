import React from 'react';

class ImportProtocolListItem extends React.Component {
  render() {
    let disabled = this.props.imported;
    let importText = this.props.imported ? 'Imported' : 'Import';
    let icon = null;
    if (this.props.imported) {
      icon =
        <span className='glyphicon glyphicon-check'></span>
    } else {
      icon =
        <span className='glyphicon glyphicon-arrow-down'></span>
    }

    return (
      <div className='protocol-list-item row'>
        <span className='protocol-list-item-left col-xs-10'>
          <span className='protocol-list-item-name'>
            {this.props.name}
          </span>
        </span>
        <span className='protocollist-item-right col-xs-2'>
          <span className='import-protocol-list-item-import'>
            <button
                type='button'
                className='btn btn-default btn-block'
                disabled={disabled}>

              {icon} {importText}
            </button>
          </span>
        </span>
      </div>
    );
  }
}

module.exports = ImportProtocolListItem;
