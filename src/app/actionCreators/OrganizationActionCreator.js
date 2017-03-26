import AppDispatcher from '../dispatcher/AppDispatcher';
import OrganizationActions from '../actions/OrganizationActions';

class OrganizationActionCreator {
  switchActiveOrg(id) {
    AppDispatcher.notify({
      type: OrganizationActions.SWITCH_ACTIVE_ORG,
      id: id,
    });
  }

  fetchOrganizations(organizations) {
    AppDispatcher.notify({
      type: OrganizationActions.FETCH_ORGANIZATIONS,
      organizations,
    });
  }

  fetchOrganization(organization) {
    AppDispatcher.notify({
      type: OrganizationActions.FETCH_ORGANIZATION,
      organization,
    });
  }

  removeOrganization(id) {
    AppDispatcher.notify({
      type: OrganizationActions.DELETE_ORGANIZATION,
      id,
    });
  }

  createOrganization(organization) {
    AppDispatcher.notify({
      type: OrganizationActions.CREATE_ORGANIZATION,
      organization,
    });
  }

  fetchGroups(id, groups) {
    AppDispatcher.notify({
      type: OrganizationActions.FETCH_GROUPS,
      id,
      groups,
    });
  }

  addGroup(id, groups) {
    AppDispatcher.notify({
      type: OrganizationActions.ADD_GROUP,
      id,
      group,
    });
  }

  removeGroup(id, groupId) {
    AppDispatcher.notify({
      type: OrganizationActions.REMOVE_GROUP,
      id,
      groupId,
    });
  }

  fetchMembers(id, members) {
    AppDispatcher.notify({
      type: OrganizationActions.FETCH_MEMBERS,
      id,
      members,
    });
  }

  addMember(id, member) {
    AppDispatcher.notify({
      type: OrganizationActions.ADD_MEMBER,
      id,
      member,
    });
  }

  removeMember(id) {
    AppDispatcher.notify({
      type: OrganizationActions.REMOVE_MEMBER,
      id,
    });
  }
}

export default new OrganizationActionCreator();
