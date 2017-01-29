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
      <div className='protocol-view-body-switcher-container'>
        <ul className='protocol-view-body-switcher nav nav-tabs'>

          <li
              role='presentation'
              className={this.state.view === XML_VIEW ? 'active' : ''}>
            <a href='#' onClick={this.switchViewXML}>XML</a>
          </li>

          <li
              role='presentation'
              className={this.state.view === HISTORY_VIEW ? 'active' : ''}>
            <a href='#' onClick={this.switchViewHistory}>History</a>
          </li>

        </ul>
        {currentView}
      </div>
    );
  }
}

export default ProtocolViewBodySwitcher;
