import React from 'react';

class ProtocolViewXML extends React.Component {
  constructor(props) {
    super(props);

    this.viewCurrent = this.viewCurrent.bind(this);
  }

  viewCurrent() {
    this.props.switchRevision(this.props.currentRevision);
  }

  render() {
    let revisionSwitcher = null;
    if (this.props.revision.revision_date !== this.props.currentRevision.revision_date) {
      revisionSwitcher =
        <a href='#' onClick={this.viewCurrent} >View current</a>
    }

    return (
      <div className='protocol-view-xml-container'>

        <div className='row'>
          <div className='col-lg-12'>

            <div className='protocol-view-xml-revision-container'>
              <span className='protocol-view-xml-current-revision'>
                Viewing {this.props.revision.revision_date}
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
                {this.props.revision.content}
              </code></pre>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

module.exports = ProtocolViewXML;
