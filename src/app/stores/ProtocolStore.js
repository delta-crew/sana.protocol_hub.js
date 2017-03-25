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

function _clearProtocols() {
  _protocols = [];
}

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

function _fetchProtocols(protocols) {
  _protocols = protocols;
}

function _fetchProtocolVersions(id, versions) {
  const protocol = _protocols.find(protocol => protocol.id === id);
  protocol.versions = versions;
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
      case OrganizationActions.SWITCH_ACTIVE_ORG:
        _clearProtocols();
        this.emitChange();
        break;

      case ProtocolActions.FETCH_ORGANIZATION_PROTOCOLS:
      case ProtocolActions.FETCH_PUBLIC_PROTOCOLS:
      case ProtocolActions.FETCH_PROTOCOLS:
        _fetchProtocols(action.protocols);
        this.emitChange();
        break;

      case ProtocolActions.FETCH_PROTOCOL_VERSIONS:
        _fetchProtocolVersions(id, action.versions);
        this.emitChange();
        break;

      case ProtocolActions.UPDATE_PROTOCOL:
        _updateProtocol(action.id, action.updates)
        this.emitChange();
        break;

      case ProtocolActions.ADD_TO_ORGANIZATION:
        _addProtocol(action.protocol);
        this.emitChange();
        break;
      case ProtocolActions.REMOVE_FROM_ORGANIZATION:
        _deleteProtocol(action.id);
        this.emitChange();
        break;
    }
  }

  fetchProtocols() {
    return request.get(`/protocols/`)
      .then(({ data }) => ProtocolActionCreator.fetchProtocols(data));
  }

  fetchPublicProtocols(query) {
    return request.get(`/protocols/public/`)
      .query({ query })
      .then(({ data }) => ProtocolActionCreator.fetchPublicProtocols(data));
  }

  fetchOrganizationProtocols(id) {
    return request.get(`/organizations/${id}/protocols/`)
      .then(({ data }) => ProtocolActionCreator.fetchOrganizationProtocols(id, data));
  }

  fetchProtocol(id) {
    return request.get(`/protocols/${id}`)
      .then(({ data }) => ProtocolActionCreator.fetchProtocol(id, data));
  }

  fetchProtocolVersions(id) {
    return request.get(`/protocols/${id}/versions/`)
      .then(({ data }) => ProtocolActionCreator.fetchProtocol(id, data));
  }

  updateProtocol(id, isPublic) {
    return request.put(`/protocols/${id}`)
      .send({ public: isPublic })
      .then(({ data }) => ProtocolActionCreator.updateProtocol(id, data));
  }

  fetchOrganizationProtocols(id) {
    return request.get(`/organizations/${id}/protocols/`)
      .then(({ data }) => ProtocolActionCreator.fetchOrganizationProtocols(id, data));
  }

  addProtocolToOrganization(organizationId, protocolId) {
    return request.post(`/organizations/${organizationId}/protocols/`)
      .send({ protocolId })
      .then(({ data }) => ProtocolActionCreator.addProtocolToOrganization(organizationId, data));
  }

  removeProtocolFromOrganization(organizationId, protocolId) {
    return request.delete(`/organizations/${organizationId}/protocols/${protocolId}`)
      .then(() => ProtocolActionCreator.removeProtocolFromOrganization(organizationId, protocolId));
  }
}

export default new ProtocolStore();
