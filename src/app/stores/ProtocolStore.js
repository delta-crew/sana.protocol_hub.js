import AppDispatcher from '../dispatcher/AppDispatcher';
import ProtocolActions from '../actions/ProtocolActions';
import { EventEmitter } from 'events';

let _protocols = [{
  id: 1,
  version: 1,
  content: '',
  owner: '',
  name: 'test protocol 1',
}];

function _addProtocol(protocol) {
  _protocols.push(protocol);
}

function _updateProtocol(id, updates) {
  let i = _protocols.findIndex((protocol) => {
    return protocol.id === id;
  });
  Object.assign(_protocols[id], updates);
}

function _removeProtocol(id) {
  let i = _protocols.findIndex((protocol) => {
    return protocol.id === id;
  });
  _protocols.splice(i, 1);
}

function _fetchProtocols(page) {
  // TODO API call
}

class ProtocolStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
  }

  getAll() {
    return _protocols;
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
      case ProtocolActions.CREATE_PROTOCOL:
        _addProtocol(action.protocol);
        this.emitChange();
        break;
      case ProtocolActions.UPDATE_PROTOCOL:
        _updateProtocol(action.id, action.updates)
        this.emitChange();
        break;
      case ProtocolActions.DELETE_PROTOCOL:
        _deleteProtocol(action.id);
        this.emitChange();
        break;
      case ProtocolActions.FETCH_PROTOCOLS:
        _fetchProtocols(action.page);
        this.emitChange();
        break;
    }
  }
}

export default new ProtocolStore();
