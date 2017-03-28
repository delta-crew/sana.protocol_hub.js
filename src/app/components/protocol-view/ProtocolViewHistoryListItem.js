import React from 'react';
import moment from 'moment';

import { XML_VIEW } from './ProtocolViewBodySwitcher';

class ProtocolViewHistoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.switchVersion = this.switchVersion.bind(this);
  }

  switchVersion() {
    this.props.switchVersion(this.props.version);
    this.props.switchView(XML_VIEW);
  }

  render() {
    let ts = this.props.version.updated_at;

    return (
      <div className='protocol-view-history-list-item row'>
        <div className='col-xs-9'>
          <div className='protocol-view-history-list-item-revision'>
            {moment(ts).format('YYYY/MM/DD hh:ss')}
          </div>
        </div>

        <div className='col-xs-3'>
          <div className='protocol-view-history-list-item-link'>
            <a href='#' onClick={this.switchVersion}>View XML</a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ProtocolViewHistoryListItem;
