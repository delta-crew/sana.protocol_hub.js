import AppDispatcher from '../dispatcher/AppDispatcher';
import GroupActions from '../actions/GroupActions';
import OrganizationActions from '../actions/OrganizationActions';
import GroupActionCreator from '../actionCreators/GroupActionCreator';
import StoreActions from '../actions/StoreActions';
import api from './api';
import { EventEmitter } from 'events';

let _groups = [{
},];

function _clearGroups() {
  _groups = [];
}

function _addGroup(group) {
  _groups.push(group);
}

function _updateGroup(id, updates) {
  let i = _groups.findIndex((group) => {
    return group.id === id;
  });
  Object.assign(_groups[id], updates);
}

function _removeGroup(id) {
  let i = _groups.findIndex((group) => {
    return group.id === id;
  });
  _groups.splice(i, 1);
}

function _addMember(groupId, member) {
  const group = groups.find(({ id }) => groupId === id);
  group.members.push(member);
}

function _removeMember(groupId, memberId) {
  const group = groups.find(({ id }) => groupId === id);
  const i = group.members.findIndex(({ id }) => memberId === id);
  group.members.splice(i, 1);
}

class GroupStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
  }

  getAll() {
    return _groups;
  }

  get(id) {
    let i = _groups.findIndex((group) => {
      return group.id === id;
    });
    return _groups[i];
  }

  emitChange() {
    this.emit(StoreActions.CHANGE_EVENT);
  }

  addChangeListener(cb) {
    this.on(StoreActions.CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(StoreActions.CHANGE_EVENT, cb);
  }

  dispatcherCallback(action) {
    switch (action.type) {
      case OrganizationActions.SWITCH_ACTIVE_ORG:
        _clearGroups();
        this.emitChange();
        break;
      case GroupActions.CREATE_GROUP:
        _addGroup(action.group);
        this.emitChange();
        break;
      case GroupActions.UPDATE_GROUP:
        _updateGroup(action.id, action.updates);
        this.emitChange();
        break;
      case GroupActions.ADD_MEMBER:
        _updateGroup(action.id, {
          members: [...this.get(action.id).members, action.member],
        });
        this.emitChange();
        break;
      case GroupActions.FETCH_MEMBERS:
        _updateGroup(action.id, { members: action.members });
        this.emitChange();
        break;
      case GroupActions.REMOVE_MEMBER:
        _removeMember(action.groupId, action.memberId);
        this.emitChange();
        break;
      case GroupActions.DELETE_GROUP:
        _deleteGroup(action.id);
        this.emitChange();
        break;
      case GroupActions.FETCH_GROUP:
        _fetchGroup(action.page);
        this.emitChange();
        break;
    }
  }

  fetchGroup(organizationId, id) {
    return api.get(`/organizations/${organizationId}/groups/${id}`)
      .then(({ body: { data } }) => GroupActionCreator.fetchGroup(data));
  }

  updateGroup(organizationId, id, data) {
    return api.put(`/organizations/${organizationId}/groups/${id}`)
      .send(data)
      .then(({ body: { data } }) => GroupActionCreator.updateGroup(id, data));
  }

  removeGroup(organizationId, id) {
    return api.delete(`/organizations/${organizationId}/groups/${id}`)
      .then(() => GroupActionCreator.removeGroup(id));
  }

  createGroup(organizationId, name) {
    return api.post(`/organizations/${organizationId}/groups/`)
      .send({ name })
      .then(({ body: { data } }) => GroupActionCreator.createGroup(data));
  }

  fetchGroupMembers(organizationId, id) {
    return api.get(`/organizations/${organizationId}/groups/${id}`)
      .then(({ body: { data } }) => GroupActionCreator.fetchGroupMembers(id, data));
  }

  addGroupMember(organizationId, groupId, memberId) {
    return api.post(`/organizations/${organizationId}/groups/${groupId}/members/`)
      .send({ memberId })
      .then(({ body: { data } }) => GroupActionCreator.addGroupMember(id, data));
  }

  removeGroupMember(organizationId, groupId, memberId) {
    return api.delete(`/organizations/${organizationId}/groups/${groupId}/members/${memberId}`)
      .then(({ body: { data } }) => GroupActionCreator.removeGroupMember(groupId, memberId));
  }
}

export default new OrganizationStore();
