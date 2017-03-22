import AppDispatcher from '../dispatcher/AppDispatcher';
import GroupActions from '../actions/GroupActions';
import StoreActions from '../actions/StoreActions';
import request from 'superagent-bluebird-promise';
import { EventEmitter } from 'events';

let _groups = [{
},];

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
    switch(action.type) {
      case GroupActions.CREATE_GROUP:
        _addGroup(action.group);
        this.emitChange();
        break;
      case GroupActions.UPDATE_GROUP:
        _updateGroup(action.id, action.updates)
        this.emitChange();
        break;
      case GroupActions.ADD_MEMBER:
        _updateGroup(action.id, action.updates)
        this.emitChange();
        break;
      case GroupActions.REMOVE_MEMBER:
        _updateGroup(action.id, action.updates)
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

  fetchGroup(id) {
    // TODO API call
  }
}

export default new OrganizationStore();
