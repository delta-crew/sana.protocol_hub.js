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

var _active_organization = {name: 'test1', id: 1};

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
  let i = _organizations.findIndex((organization) => {
    return organization.id === id;
  });
  if(i > -1) _active_organization = _organizations[i];
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
    let i = _organizations.findIndex((organization) => {
      return organization.id === id;
    });
    if(i > -1) return _organizations[i];
    else return null;
  }

  getActiveOrg() {
    return _active_organization;
  }

  getGroups(id) {
    let organization = get(id);
    if(organization) return organization.id;
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
    switch(action.type) {
      case OrganizationActions.CREATE_ORGANIZATION:
        _addOrganization(action.organization);
        this.emitChange();
        break;
      case OrganizationActions.UPDATE_ORGANIZATION:
        _updateOrganization(action.id, action.updates)
        this.emitChange();
        break;
      case OrganizationActions.ADD_MEMBER:
        _updateOrganization(action.id, action.updates)
        this.emitChange();
        break;
      case OrganizationActions.REMOVE_MEMBER:
        _updateOrganization(action.id, action.updates)
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
    // TODO API call
  }

  fetchGroups(id) {
    // TODO API call
  }
}

export default new OrganizationStore();
