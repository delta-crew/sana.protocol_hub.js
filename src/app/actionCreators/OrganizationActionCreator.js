import AppDispatcher from '../dispatcher/AppDispatcher';
import OrganizationActions from '../actions/OrganizationActions';

class OrganizationActionCreator {
  switchActiveOrg(id) {
    AppDispatcher.notify({
      type: OrganizationActions.SWITCH_ACTIVE_ORG,
      id: id,
    });
  }
}

export default new OrganizationActionCreator();
