import React from 'react';
import moment from 'moment';

class ProtocolViewXML extends React.Component {
  constructor(props) {
    super(props);

    this.viewCurrent = this.viewCurrent.bind(this);
  }

  viewCurrent() {
    this.props.switchVersion(this.props.currentVersion);
  }

  render() {
    let versionSwitcher = null;
    if (this.props.version.updated_at !== this.props.currentVersion.updated_at) {
      versionSwitcher =
        <a href='#' onClick={this.viewCurrent} >View current</a>
    }
    let ts = this.props.version.updated_at;

    return (
      <div className='protocol-view-xml-container'>

        <div className='row'>
          <div className='col-lg-12'>

            <div className='protocol-view-xml-revision-container'>
              <span className='protocol-view-xml-current-revision'>
                Viewing {moment(ts).format('YYYY/MM/DD')}
              </span>

              <span className='protocol-view-xml-revision-switcher'>
                {versionSwitcher}
              </span>
            </div>

          </div>
        </div>


        <div className='row'>
          <div className='col-lg-12'>

            <div className='protocol-view-xml-body'>
              <pre><code>
                {this.props.version.content}
              </code></pre>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

module.exports = ProtocolViewXML;
