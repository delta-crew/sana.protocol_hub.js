import React from 'react';

import { CURRENT_REVISION } from './ProtocolViewBodySwitcher';

class ProtocolViewXML extends React.Component {
  constructor(props) {
    super(props);

    this.viewCurrent = this.viewCurrent.bind(this);
  }

  viewCurrent() {
    this.props.switchRevision(CURRENT_REVISION);
  }

  render() {
    let revisionSwitcher = null;
    if (this.props.revision !== CURRENT_REVISION) {
      revisionSwitcher =
        <div id='protocol-view-xml-revision-switcher'>
            <a href='#' onClick={this.viewCurrent} >View current</a>
        </div>;
    }

    return (
      <div id='protocol-view-xml-container'>
          <div id='protocol-view-xml-current-revision'>
              Viewing {this.props.revision}
          </div>
          {revisionSwitcher}
          <div id='protocol-view-xml-body'>
              <pre><code>
                  "Protocol Content"
              </code></pre>
          </div>
      </div>
    );
  }
}

module.exports = ProtocolViewXML;
