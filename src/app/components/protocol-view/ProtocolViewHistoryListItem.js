import React from 'react';
import * as moment from 'moment';

import { XML_VIEW } from './ProtocolViewBodySwitcher';

class ProtocolViewHistoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.switchRevision = this.switchRevision.bind(this);
  }

  switchRevision() {
    this.props.switchRevision(this.props.revision);
    this.props.switchView(XML_VIEW);
  }

  render() {
    let ts = this.props.revision.revision_date;

    return (
      <div className='protocol-view-history-list-item row'>
        <div className='col-xs-9'>
          <div className='protocol-view-history-list-item-revision'>
            {moment.unix(ts).format('YYYY/MM/DD')}
          </div>
        </div>

        <div className='col-xs-3'>
          <div className='protocol-view-history-list-item-link'>
            <a href='#' onClick={this.switchRevision}>View XML</a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ProtocolViewHistoryListItem;
