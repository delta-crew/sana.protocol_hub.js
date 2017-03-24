import AppDispatcher from '../dispatcher/AppDispatcher';
import OrganizationActions from '../actions/OrganizationActions';
import OrganizationActionCreator from '../actionCreators/OrganizationActionCreator';
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
  organization[field] = organization[field].reduce((memo, item) => {
    if (id !== item.id) {
      memo.push(item);
    }
  });
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
      case OrganizationActions.DELETE_ORGANIZATION:
        _deleteOrganization(action.id);
        this.emitChange();
        break;
      case OrganizationActions.FETCH_ORGANIZATION:
        _fetchOrganization(action.page);
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
        _removeFieldOnOrganization(action.id, 'members', action.id);
        this.emitChange();
        break;

      case OrganizationActions.SWITCH_ACTIVE_ORG:
        _switchActiveOrg(action.id);
        this.emitChange();
        break;
    }
  }

  fetchOrganization(id) {
    return request.get(`/organizations/${id}`)
      .then(({ data }) => OrganizationActionCreator.fetchOrganization(data));
  }

  removeOrganization(id) {
    return request.delete(`/organizations/${id}`)
      .then(() => OrganizationActionCreator.removeOrganization(id));
  }

  createOrganization(name) {
    return request.post(`/organizations/`)
      .send({ name })
      .then(({ data }) => OrganizationActionCreator.createOrganization(data));
  }

  fetchGroups(id) {
    return request.get(`/organizations/${id}/groups`)
      .then(({ data }) => OrganizationActionCreator.fetchGroups(id, groups));
  }

  addGroup(id, name) {
    return request.post(`/organizations/${id}/groups/`)
      .send({ name })
      .then(({ data }) => OrganizationActionCreator.addGroup(id, data));
  }

  removeGroup(id, groupId) {
    return request.delete(`/organizations/${id}/groups/${groupId}`)
      .then(({ data }) => OrganizationActionCreator.removeGroup(id, groupId));
  }

  fetchMembers(id) {
    return request.get(`/organizations/${id}/members/`)
      .then(({ data }) => OrganizationActionCreator.fetchMembers(id, daata));
  }

  addMember(id, userId) {
    return request.post(`/organizations/${id}/members/`)
      .send({ userId })
      .then(({ data }) => OrganizationActionCreator.addMember(id, data));
  }

  removeMember(id, userId) {
    return request.delete(`/organizations/${id}/members/${userId}`)
      .then(({ data }) => OrganizationActionCreator.removeMember(id, userId));
  }
}

export default new OrganizationStore();
