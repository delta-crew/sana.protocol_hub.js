import AppDispatcher from '../dispatcher/AppDispatcher';
import OrganizationActions from '../actions/OrganizationActions';
import StoreActions from '../actions/StoreActions';
import request from 'superagent-bluebird-promise';
import { EventEmitter } from 'events';

let _organizations = [
  {
    name: 'test1',
    id: 1,
  },
  {
    name: 'test2',
    id: 2,
  },
];

let _activeOrganization = { name: 'test1', id: 1 };

function _addOrganization(organization) {
  _organizations.push(organization);
}

function _updateOrganization(id, updates) {
  let i = _organizations.findIndex((organization) => {
    return organization.id === id;
  });
  if(i > -1) Object.assign(_organizations[i], updates);
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

class OrganizationStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
  }

  static getAll() {
    return _organizations;
  }

  static get(id) {
    const i = _organizations.findIndex(organization => organization.id === id);
    if (i > -1) return _organizations[i];
    return null;
  }

  static getActiveOrg() {
    return _activeOrganization;
  }

  getGroups(id) {
    const organization = this.get(id);
    if (organization) return organization.id;
    return null;
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
      case OrganizationActions.ADD_MEMBER:
        _updateOrganization(action.id, action.updates);
        this.emitChange();
        break;
      case OrganizationActions.REMOVE_MEMBER:
        _updateOrganization(action.id, action.updates);
        this.emitChange();
        break;
      case OrganizationActions.DELETE_ORGANIZATION:
        _deleteOrganization(action.id);
        this.emitChange();
        break;
      case OrganizationActions.FETCH_ORGANIZATION:
        _fetchOrganization(action.page);
        this.emitChange();
        break;
      case OrganizationActions.SWITCH_ACTIVE_ORG:
        _switchActiveOrg(action.id);
        this.emitChange();
        break;
    }
  }

  fetchOrganization(id) {
    return request.get(`/organizations/${id}`);
  }

  removeOrganization(id) {
    return request.delete(`/organizations/${id}`);
  }

  createOrganization(id, name) {
    return request.post(`/organizations/`)
      .send({ name });
  }

  fetchGroups(id) {
    return request.get(`/organizations/${id}/groups`);
  }

  addGroup(id, userId) {
    return request.post(`/organizations/${id}/groups/`)
      .send({ userId });
  }

  removeGroup(id, userId) {
    return request.delete(`/organizations/${id}/groups/${groupId}`);
  }

  fetchMembers(id) {
    return request.get(`/organizations/${id}/members/`);
  }

  addMember(id, userId) {
    return request.post(`/organizations/${id}/members/`)
      .send({ userId });
  }

  removeMember(id, userId) {
    return request.delete(`/organizations/${id}/members/${userId}`);
  }
}

export default new OrganizationStore();
