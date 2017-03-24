import AppDispatcher from '../dispatcher/AppDispatcher';
import ProtocolActions from '../actions/ProtocolActions';
import StoreActions from '../actions/StoreActions';
import request from 'superagent-bluebird-promise';
import { EventEmitter } from 'events';

let _protocols = [
  {
    id: 1,
    revision: 1,
    content: '<BODY>CONTENT</BODY>',
    owner: 'delta',
    name: 'test protocol 1',
    private: true,
    revision_date: 1490327694,
  }, {
    id: 1,
    revision: 2,
    content: '<BODY>OLD CONTENT</BODY>',
    owner: 'delta',
    name: 'test protocol 1',
    private: true,
    revision_date: 1400300000,
  },
];

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

class ProtocolStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
  }

  getAll() {
    return _protocols;
  }

  getLatest() {
    let latest = {};
    this.getAll().forEach((protocol) => {
      let id = protocol.id;

      if(!latest[id] || latest[id].revision_date < protocol.revision_date) {
        latest[id] = protocol;
      }
    });
    return Object.values(latest);
  }

  get(id) {
    let revisions = getAllRevisions(id);
    return revisions[0];
  }

  getAllRevisions(id) {
    let revisions = [];
    this.getAll().forEach((protocol) => {
      if(protocol.id === id) revisions.push(protocol);
    });

    return revisions;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(cb) {
    this.on(StoreActions.CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(StoreActions.CHANGE_EVENT, cb);
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

  fetchProtocols() {
    return request.get(`/protocols/`);
  }

  fetchPublicProtocols() {
    return request.get(`/protocols/public/`);
  }

  updateProtocol(id, isPublic) {
    return request.put(`/protocols/${id}`)
      .send({ public: isPublic });
  }

  fetchOrganizationProtocols(id) {
    return request.get(`/organizations/${id}/protocols/`);
  }

  addProtocolToOrganization(organizationId, protocolId) {
    return request.post(`/organizations/${organizationId}/protocols/`)
      .send({ protocolId });
  }

  removeProtocolFromOrganization(organizationId, protocolId) {
    return request.delete(`/organizations/${organizationId}/protocols/${protocolId}`);
  }
}

export default new ProtocolStore();
