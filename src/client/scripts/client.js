import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from '../../app/components/App';
import HomePage from '../../app/components/home/HomePage';
import SyncPage from '../../app/components/sync/SyncPage';
import ImportPage from '../../app/components/import/ImportPage';
import SearchResultsPage from '../../app/components/search/SearchResultsPage';

require('../styles/main.less');

ReactDOM.render((
  <Router history={browserHistory}>
      <Route component={App}>
          <Route path='/' component={HomePage} />
          <Route path='/search' component={SearchResultsPage} />
          <Route path='/sync' component={SyncPage} />
          <Route path='/import' component={ImportPage} />
      </Route>
  </Router>
), document.getElementById('app-root'));
