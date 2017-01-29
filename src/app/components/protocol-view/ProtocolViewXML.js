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
        <a href='#' onClick={this.viewCurrent} >View current</a>
    }

    return (
      <div className='protocol-view-xml-container'>

        <div className='row'>
          <div className='col-lg-12'>

            <div className='protocol-view-xml-revision-container'>
              <span className='protocol-view-xml-current-revision'>
                Viewing {this.props.revision}
              </span>

              <span className='protocol-view-xml-revision-switcher'>
                {revisionSwitcher}
              </span>
            </div>

          </div>
        </div>


        <div className='row'>
          <div className='col-lg-12'>

            <div className='protocol-view-xml-body'>
              <pre><code>
                {"Protocol content " + this.props.revision}
              </code></pre>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

module.exports = ProtocolViewXML;
