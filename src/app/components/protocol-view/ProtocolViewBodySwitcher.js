import React from 'react';

import ProtocolViewXML from './ProtocolViewXML';
import ProtocolViewHistory from './ProtocolViewHistory';

export let XML_VIEW = 'xml'
export let HISTORY_VIEW = 'history'
export let CURRENT_REVISION = 'current'

class ProtocolViewBodySwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: XML_VIEW,
      revision: CURRENT_REVISION,
    }
    this.switchViewXML = this.switchView.bind(this, XML_VIEW);
    this.switchViewHistory = this.switchView.bind(this, HISTORY_VIEW);
  }

  switchView(view) {
    this.setState({view: view});
  }

  switchRevision(revision) {
    this.setState({revision: revision});
  }

  render() {
    let currentView = null;
    if (this.state.view === XML_VIEW) {
      currentView =
        <ProtocolViewXML revision={this.state.revision}
            switchRevision={this.switchRevision.bind(this)} />
    } else if (this.state.view == HISTORY_VIEW) {
      currentView =
        <ProtocolViewHistory
            switchRevision={this.switchRevision.bind(this)}
            switchView={this.switchView.bind(this)} />
    }

    return (
      <div id='protocol-view-body-switcher-container'>
          <div id='protocol-view-body-switcher'>
              <a href='#' onClick={this.switchViewXML}>XML</a>
              <a href='#' onClick={this.switchViewHistory}>History</a>
          </div>
          {currentView}
      </div>
    );
  }
}

export default ProtocolViewBodySwitcher;
