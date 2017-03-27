import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from '../../app/components/App';
import HomePage from '../../app/components/home/HomePage';
import SyncPage from '../../app/components/sync/SyncPage';
import AddMdsPage from '../../app/components/mds/AddMdsPage';
import AddOrganizationPage from '../../app/components/settings/organizations/AddOrganizationPage';
import SearchResultsPage from '../../app/components/search/SearchResultsPage';
import ProtocolViewPage from '../../app/components/protocol-view/ProtocolViewPage';
import ProtocolSharePage from '../../app/components/share/ProtocolSharePage';
import MdsManagementPage from '../../app/components/mds/MdsManagementPage';
import MemberManagementPage from '../../app/components/settings/members/MemberManagementPage';
import GroupManagementPage from '../../app/components/settings/groups/GroupManagementPage';

require('../styles/main.less');

ReactDOM.render((
  <Router history={browserHistory}>
      <Route component={App}>
          <Route path='/' component={HomePage} />
          <Route path='/search' component={SearchResultsPage} />
          <Route path='/sync' component={SyncPage} />
          <Route path='/new/mds' component={AddMdsPage} />
          <Route path='/new/organization' component={AddOrganizationPage} />
          <Route path='/protocol/:protocolId' component={ProtocolViewPage} />
          <Route path='/share/:protocolId' component={ProtocolSharePage} />
          <Route path='/mds' component={MdsManagementPage} />
          <Route path='/organizations/:organizationId/mds/:mdsId' component={SyncPage} />
          <Route path='/settings/members' component={MemberManagementPage} />
          <Route path='/settings/groups' component={GroupManagementPage} />
      </Route>
  </Router>
), document.getElementById('app-root'));
