import AppDispatcher from '../dispatcher/AppDispatcher';
import GroupActions from '../actions/GroupActions';

class GroupActionCreator {
  fetchGroup(group) {
    AppDispatcher.notify({
      type: GroupActions.FETCH_GROUP,
      group,
    });
  }

  removeGroup(id) {
    AppDispatcher.notify({
      type: GroupActions.REMOVE_GROUP,
      id,
    });
  }

  createGroup(group) {
    AppDispatcher.notify({
      type: GroupActions.CREATE_GROUP,
      group,
    });
  }

  updateGroup(id, group) {
    AppDispatcher.notify({
      type: GroupActions.UPDATE_GROUP,
      id,
      updates: group,
    });
  }

  fetchGroupMembers(id, members) {
    AppDispatcher.notify({
      type: GroupActions.FETCH_MEMBERS,
      id,
      members,
    });
  }

  addGroupMember(id, member) {
    AppDispatcher.notify({
      type: GroupActions.ADD_MEMBER,
      id,
      member,
    });
  }

  removeGroupMember(groupId, memberId) {
    AppDispatcher.notify({
      type: GroupActions.REMOVE_MEMBER,
      groupId,
      memberId,
    });
  }
}

export default new GroupActionCreator();
