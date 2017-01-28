import React from 'react';

//import config from '../../../config/app';

class App extends React.Component {
  render() {
    return (
      <div>
          <header className="row" id='mdsprocedures-menu'>
              <h1 className="col-md-12">Sana Protocol Builder</h1>
          </header>

          <div className="container-fluid" className='app'>
              {this.props.children}
          </div>

          <footer className="row" id='main-footer'>
            <div className="col-md-12">
              <p>
                  Copyright &copy; 2015-2017 Sana Protocol Builder
              </p>
              <ul className="list-inline">
                  <li><a href='/english/credits'>Credits</a></li>
              </ul>
            </div>
          </footer>
      </div>
    );
  }
}

module.exports = App;
