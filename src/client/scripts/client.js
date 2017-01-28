import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from '../../app/components/App';
import SyncPage from '../../app/components/SyncPage';
import HomePage from '../../app/components/HomePage';

require('../styles/main.less');

ReactDOM.render((
  <Router history={browserHistory}>
      <Route component={App}>
          <Route path='/' component={HomePage} />
          <Route path='/sync' component={SyncPage} />
      </Route>
  </Router>
), document.getElementById('app-root'));
