import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from '../../app/components/App';
import HomePage from '../../app/components/HomePage';
import SyncPage from '../../app/components/SyncPage';
import ImportPage from '../../app/components/import/ImportPage';

require('../styles/main.less');

ReactDOM.render((
  <Router history={browserHistory}>
      <Route component={App}>
          <Route path='/' component={HomePage} />
          <Route path='/sync' component={SyncPage} />
          <Route path='/import' component={ImportPage} />
      </Route>
  </Router>
), document.getElementById('app-root'));
