import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from '../../app/components/App';
import SyncPage from '../../app/components/SyncPage';

ReactDOM.render((
  <Router history={browserHistory}>
      <Route path='/' component={App} >
          <Route path='/sync' component={SyncPage} />
      </Route>
  </Router>
), document.getElementById('app-root'));
