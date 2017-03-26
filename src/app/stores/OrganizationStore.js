import AppDispatcher from '../dispatcher/AppDispatcher';
import OrganizationActions from '../actions/OrganizationActions';
import OrganizationActionCreator from '../actionCreators/OrganizationActionCreator';
import StoreActions from '../actions/StoreActions';
import api from './api';
import { EventEmitter } from 'events';

let _organizations = [];

let _activeOrganization = null;

function _addOrganization(organization) {
  _organizations.push(organization);
}

function _updateOrganization(id, updates) {
  let i = _organizations.findIndex((organization) => {
    return organization.id === id;
  });
  if(i > -1) Object.assign(_organizations[i], updates);
}

function _updateFieldOnOrganization(id, field, data) {
  let organization = _organizations.find(({ id: _id }) => id == _id);
  organization[field] = data;
}

function _addFieldOnOrganization(id, field, data) {
  let organization = _organizations.find(({ id: _id }) => id == _id);
  organization[field].push(data);
}

function _removeFieldOnOrganization(id, field, data) {
  let organization = _organizations.find(({ id: _id }) => id == _id);
  organization[field] = organization[field].filter(item => data !== item.id);
}

function _removeMemberOfOrganization(id, userId) {
  let organization = _organizations.find(({ id: _id }) => id == _id);
  organization.members = organization.members.filter(item => userId !== item.user.id);
}

function _removeOrganization(id) {
  let i = _organizations.findIndex((organization) => {
    return organization.id === id;
  });
  if(i > -1) _organizations.splice(i, 1);
}

function _switchActiveOrg(id) {
  const i = _organizations.findIndex(organization => organization.id === id);
  if (i > -1) _activeOrganization = _organizations[i];
}

function _setOrganizations(organizations) {
  _organizations = organizations;
}

class OrganizationStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
  }

  getAll() {
    return _organizations;
  }

  get(id) {
    const i = _organizations.findIndex(organization => organization.id === id);
    if (i > -1) return _organizations[i];
    return null;
  }

  getActiveOrg() {
    return _activeOrganization;
  }

  getActiveOrgId() {
    return _activeOrganization ? _activeOrganization.id : null;
  }

  getGroups(id = this.getActiveOrgId()) {
    const organization = this.get(id);
    if (organization) return organization.groups;
    return [];
  }

  getMembers(id = this.getActiveOrgId()) {
    const organization = this.get(id);
    if (organization) return organization.members;
    return [];
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
      default: break;
      case OrganizationActions.CREATE_ORGANIZATION:
        _addOrganization(action.organization);
        this.emitChange();
        break;
      case OrganizationActions.UPDATE_ORGANIZATION:
        _updateOrganization(action.id, action.updates);
        this.emitChange();
        break;
      case OrganizationActions.DELETE_ORGANIZATION:
        _deleteOrganization(action.id);
        this.emitChange();
        break;
      case OrganizationActions.FETCH_ORGANIZATION:
        _fetchOrganization(action.organization);
        this.emitChange();
        break;
      case OrganizationActions.FETCH_ORGANIZATIONS:
        _setOrganizations(action.organizations);
        this.emitChange();
        break;

      case OrganizationActions.FETCH_GROUPS:
        _updateFieldOnOrganization(action.id, 'groups', action.groups);
        this.emitChange();
        break;
      case OrganizationActions.ADD_GROUP:
        _addFieldOnOrganization(action.id, 'groups', action.group);
        this.emitChange();
        break;
      case OrganizationActions.REMOVE_GROUP:
        _removeFieldOnOrganization(action.id, 'groups', action.id);
        this.emitChange();
        break;

      case OrganizationActions.FETCH_MEMBERS:
        _updateFieldOnOrganization(action.id, 'members', action.members);
        this.emitChange();
        break;
      case OrganizationActions.ADD_MEMBER:
        _addFieldOnOrganization(action.id, 'members', action.member);
        this.emitChange();
        break;
      case OrganizationActions.REMOVE_MEMBER:
        _removeMemberOfOrganization(action.id, action.userId);
        this.emitChange();
        break;

      case OrganizationActions.SWITCH_ACTIVE_ORG:
        _switchActiveOrg(action.id);
        this.emitChange();
        break;
    }
  }

  fetchOrganizations() {
    return api.get(`/organizations/`)
      .then(({ body: { data } }) => OrganizationActionCreator.fetchOrganizations(data));
  }

  fetchOrganization(id) {
    return api.get(`/organizations/${id}`)
      .then(({ body: { data } }) => OrganizationActionCreator.fetchOrganization(data));
  }

  removeOrganization(id) {
    return api.delete(`/organizations/${id}`)
      .then(() => OrganizationActionCreator.removeOrganization(id));
  }

  createOrganization(name) {
    return api.post(`/organizations/`)
      .send({ name })
      .then(({ body: { data } }) => OrganizationActionCreator.createOrganization(data));
  }

  fetchGroups(id) {
    return api.get(`/organizations/${id}/groups`)
      .then(({ body: { data } }) => OrganizationActionCreator.fetchGroups(id, groups));
  }

  addGroup(id, name) {
    return api.post(`/organizations/${id}/groups/`)
      .send({ name })
      .then(({ body: { data } }) => OrganizationActionCreator.addGroup(id, data));
  }

  removeGroup(id, groupId) {
    return api.delete(`/organizations/${id}/groups/${groupId}`)
      .then(({ body: { data } }) => OrganizationActionCreator.removeGroup(id, groupId));
  }

  fetchMembers(id) {
    return api.get(`/organizations/${id}/members/`)
      .then(({ body: { data } }) => OrganizationActionCreator.fetchMembers(id, data));
  }

  addMember(id, userId) {
    return api.post(`/organizations/${id}/members/`)
      .send({ user_id: userId })
      .then(({ body: { data } }) => OrganizationActionCreator.addMember(id, data));
  }

  removeMember(id, userId) {
    return api.delete(`/organizations/${id}/members/${userId}`)
      .then(({ body: { data } }) => OrganizationActionCreator.removeMember(id, userId));
  }
}

export default new OrganizationStore();
