import AppDispatcher from '../dispatcher/AppDispatcher';
import ProtocolActions from '../actions/ProtocolActions';
import ProtocolActionCreator from '../actionCreators/ProtocolActionCreator';
import OrganizationActions from '../actions/OrganizationActions';
import StoreActions from '../actions/StoreActions';
import api from './api';
import { EventEmitter } from 'events';

let _protocols = [];

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
 var protocol = _protocols.find(protocol => protocol.id === id);
  if(!protocol) {
    _addProtocol(versions[0]);
    protocol = versions[0];
  }
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

      if(!latest[id] || latest[id].version < protocol.version) {
        latest[id] = protocol;
      }
    });
    return Object.values(latest);
  }

  get(id) {
    const protocol = _protocols.find(protocol => protocol.id === id);
    return protocol;
  }

  getAllVersions(id) {
    let protocol = this.get(id);
    var versions = [];

    if(protocol && protocol.versions) {
      versions = protocol.versions;
      versions.sort((a, b) => a.version - b.version);
    }

    return versions;
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
      case OrganizationActions.SWITCH_ACTIVE_ORG:
        _clearProtocols();
        this.emitChange();
        break;

      case ProtocolActions.FETCH_PROTOCOL:
        _addProtocol(action.protocol);
        this.emitChange();
        break;

      case ProtocolActions.FETCH_ORGANIZATION_PROTOCOLS:
      case ProtocolActions.FETCH_PUBLIC_PROTOCOLS:
      case ProtocolActions.FETCH_PROTOCOLS:
        _fetchProtocols(action.protocols);
        this.emitChange();
        break;

      case ProtocolActions.FETCH_PROTOCOL_VERSIONS:
        _fetchProtocolVersions(action.id, action.versions);
        this.emitChange();
        break;

      case ProtocolActions.UPDATE_PROTOCOL:
        _updateProtocol(action.id, action.updates)
        this.emitChange();
        break;

      case ProtocolActions.ADD_TO_ORGANIZATION:
        /*
        _addProtocol(action.protocol);
        this.emitChange();
        */
        break;
      case ProtocolActions.REMOVE_FROM_ORGANIZATION:
        /*
        _deleteProtocol(action.id);
        this.emitChange();
        */
        break;
    }
  }

  fetchProtocols() {
    return api.get(`/protocols/`)
      .then(({ body: { data } }) => ProtocolActionCreator.fetchProtocols(data));
  }

  fetchPublicProtocols(query) {
    return api.get(`/protocols/public/`)
      .query({ query })
      .then(({ body: { data } }) => ProtocolActionCreator.fetchPublicProtocols(data));
  }

  fetchOrganizationProtocols(id) {
    return api.get(`/organizations/${id}/protocols/`)
      .then(({ body: { data } }) => ProtocolActionCreator.fetchOrganizationProtocols(id, data));
  }

  fetchProtocol(id) {
    return api.get(`/protocols/${id}`)
      .then(({ body: { data } }) => ProtocolActionCreator.fetchProtocol(data));
  }

  fetchProtocolVersions(id) {
    return api.get(`/protocols/${id}/versions/`)
      .then(({ body: { data } }) => ProtocolActionCreator.fetchProtocolVersions(id, data));
  }

  updateProtocol(id, isPublic) {
    return api.put(`/protocols/${id}`)
      .send({ public: isPublic })
      .then(({ body: { data } }) => ProtocolActionCreator.updateProtocol(id, data));
  }

  fetchOrganizationProtocols(id) {
    return api.get(`/organizations/${id}/protocols/`)
      .then(({ body: { data } }) => ProtocolActionCreator.fetchOrganizationProtocols(id, data));
  }

  addProtocolToOrganization(organizationId, protocolId, version) {
    return api.post(`/organizations/${organizationId}/protocols/`)
      .send({ protocol_id: protocolId, version })
      .then(({ body: { data } }) => ProtocolActionCreator.addProtocolToOrganization(organizationId, data));
  }

  removeProtocolFromOrganization(organizationId, protocolId) {
    return api.delete(`/organizations/${organizationId}/protocols/${protocolId}`)
      .then(() => ProtocolActionCreator.removeProtocolFromOrganization(organizationId, protocolId));
  }
}

export default new ProtocolStore();
