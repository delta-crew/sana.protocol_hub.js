import React from 'react';
import { Link, browserHistory } from 'react-router';

import UserStore from '../stores/UserStore';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: this.props.location.query.query,
      logged_in: UserStore.loggedIn(),
    };

    // TODO Don't hardcode!
    this.builderUrl = 'http://localhost:8080';
    this._onLoad = this._onLoad.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  _onLoad() {
    this.setState({
      logged_in: UserStore.loggedIn(),
    });
  }

  componentWillMount() {
    UserStore.fetchMe();
    UserStore.addChangeListener(this._onLoad);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onLoad);
  }

  handleQuery(event) {
    this.setState({query: event.target.value});
  }

  handleSearch(event) {
    event.preventDefault();
    browserHistory.push('/search?query=' + this.state.query);
  }

  render() {
    let nav_settings =
      <div className='navbar-right'>
        <a className='nav-button' href={this.builderUrl + '/en/login/hub'}>Login</a>
      </div>;

    if(this.state.logged_in) {
      nav_settings = (
        <div className='navbar-right'>
          <Link className='user-settings nav-button' to='/settings/members' role='button'>
            <span className='glyphicon glyphicon-user user-icon'></span>
            {' '}{UserStore.getUser().first_name}
          </Link>
          <a className='nav-button' href={this.builderUrl + '/en/logout/hub'}>
            Logout
          </a>
        </div>
      );
    }

    return (
      <div>
        <nav className='navbar'>
          <div className='navbar-left'>
            <Link to='/' className='home-button'><span className='glyphicon glyphicon-home'></span></Link>
            <form className='search-bar' onSubmit={this.handleSearch}>
              <input type='text' value={this.state.query} onChange={this.handleQuery} placeholder='search protocol directory' />
            </form>
          </div>

          {nav_settings}
        </nav>

        <header className='title-bar'>
          <h1 className='sana-logo'>Sana Protocol Hub</h1>
        </header>

        <div className='container-fluid App'>
          {this.props.children}
        </div>

        <footer className="main-footer">
          <p>
            Copyright &copy; 2017 Sana Protocol Hub
          </p>
          <ul className="list-inline">
            <li><Link to='/english/credits'>Credits</Link></li>
          </ul>
        </footer>
      </div>
    );
  }
}

module.exports = App;
