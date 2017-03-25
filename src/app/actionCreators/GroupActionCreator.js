import AppDispatcher from '../dispatcher/AppDispatcher';
import GroupActions from '../actions/GroupActions';

class GroupActionCreator {
  fetchGroup(group) {
    GroupActions.notify({
      type: GroupActions.FETCH_GROUP,
      group,
    });
  }

  removeGroup(id) {
    GroupActions.notify({
      type: GroupActions.REMOVE_GROUP,
      id,
    });
  }

  createGroup(group) {
    GroupActions.notify({
      type: GroupActions.CREATE_GROUP,
      group,
    });
  }

  updateGroup(id, group) {
    GroupActions.notify({
      type: GroupActions.UPDATE_GROUP,
      id,
      updates: group,
    });
  }

  fetchGroupMembers(id, members) {
    GroupActions.notify({
      type: GroupActions.FETCH_MEMBERS,
      id,
      members,
    });
  }

  addGroupMember(id, member) {
    GroupActions.notify({
      type: GroupActions.ADD_MEMBER,
      id,
      member,
    });
  }

  removeGroupMember(groupId, memberId) {
    GroupActions.notify({
      type: GroupActions.REMOVE_MEMBER,
      groupId,
      memberId,
    });
  }
}

export default new GroupActionCreator();
