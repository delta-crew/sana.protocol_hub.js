import React from 'react';

//import config from '../../../config/app';

class App extends React.Component {
  render() {
    return (
      <div>
          <header class='container-fluid spb-container' id='mdsprocedures-menu'>
              <h1>Sana Protocol Builder</h1>
          </header>

          <div className='app'>
              {this.props.children}
          </div>

          <footer id="main-footer">
              <p>
                  Copyright &copy; 2015-2017 Sana Protocol Builder
              </p>
              <ul>
                  <li><a href='/english/credits'>Credits</a></li>
              </ul>
          </footer>
      </div>
    );
  }
}

module.exports = App;
