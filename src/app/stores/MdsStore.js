import AppDispatcher from '../dispatcher/AppDispatcher';
import MdsActions from '../actions/MdsActions';
import { EventEmitter } from 'events';

let _mds = [{
  id: 1,
  owner: '',
  name: 'mds 1',
  link: 'http://mds1.com/api',
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

function _fetchMds(page) {
  // TODO API call
}

class MdsStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
  }

  getAll() {
    return _mds;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
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
}

export default new MdsStore();
