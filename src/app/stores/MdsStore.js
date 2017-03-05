import AppDispatcher from '../dispatcher/AppDispatcher';
import MdsActions from '../actions/MdsActions';
import StoreActions from '../actions/StoreActions';
import request from 'superagent-bluebird-promise';
import { EventEmitter } from 'events';

let _mds = [{
  id: 1,
  owner: '',
  name: 'mds 1',
  link: 'http://mds1.com/api',
  synced_protocols: [],
}];

function _addMds(mds) {
  _mds.push(mds);
}

function _updateMds(id, updates) {
  let i = _mds.findIndex((mds) => {
    return mds.id === id;
  });
  Object.assign(_mds[id], updates);
}

function _removeMds(id) {
  let i = _mds.findIndex((mds) => {
    return mds.id === id;
  });
  _mds.splice(i, 1);
}

class MdsStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
  }

  getAll() {
    return _mds;
  }

  get(id) {
    let i = _mds.findIndex((mds) => {
      return mds.id === id;
    });
    return _mds[i];
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
      case MdsActions.CREATE_MDS:
        _addMds(action.mds);
        this.emitChange();
        break;
      case MdsActions.UPDATE_MDS:
        _updateMds(action.id, action.updates)
        this.emitChange();
        break;
      case MdsActions.DELETE_MDS:
        _deleteMds(action.id);
        this.emitChange();
        break;
      case MdsActions.FETCH_MDS:
        _fetchMds(action.page);
        this.emitChange();
        break;
    }
  }

  fetchMds() {
    // TODO API call
  }

  fetchSyncedProtocols(id) {
    // TODO API call
  }
}

export default new MdsStore();
