import React from 'react';
import { browserHistory } from 'react-router';

//import config from '../../../config/app';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      query: ''
    };

    this.handleQuery = this.handleQuery.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleQuery(event) {
    this.setState({query: event.target.value});
  }

  handleSearch(event) {
    event.preventDefault();
    browserHistory.push('/search?' + this.state.query);
  }

  render() {
    return (
      <div>
        <div className='navbar'>
          <a href='/'><span className='glyphicon glyphicon-home'></span></a>
          <form onSubmit={this.handleSearch}>
            <input type='text' value={this.state.query} onChange={this.handleQuery} placeholder='search protocols' />
          </form>

          <span className='glyphicon glyphicon-user'></span>
          <a href='#' className='dropdown-toggle btn btn-primary'>
            User <span className='caret'></span>
          </a>
          <ul className='dropdown-menu'>
            <li><a>Profile</a></li>
          </ul>
        </div>

        <header className="row">
          <h1 className="col-md-12">Sana Protocol Hub</h1>
        </header>

        <div className="container-fluid app">
          {this.props.children}
        </div>

        <footer className="row" id='main-footer'>
          <div className="col-md-12">
            <p>
              Copyright &copy; 2017 Sana Protocol Hub
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
