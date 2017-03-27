import AppDispatcher from '../dispatcher/AppDispatcher';
import MdsActions from '../actions/MdsActions';
import OrganizationActions from '../actions/OrganizationActions';
import StoreActions from '../actions/StoreActions';
import MdsActionCreator from '../actionCreators/MdsActionCreator';
import api from './api';
import { EventEmitter } from 'events';

let _mds = [];

function _clearMds() {
  _mds = [];
}

function _addMds(mds) {
  _mds.push(mds);
}

function _fetchMds(mds) {
  let i = _mds.findIndex(item => item.id === mds.id);
  if (i > -1) {
    _mds[i] = mds;
  } else {
    _mds.push(mds);
  }
}

function _listMds(mds) {
  _mds = mds;
}

function _updateMds(id, updates) {
  let i = _mds.findIndex((mds) => {
    return mds.id === id;
  });
  Object.assign(_mds[i], updates);
}

function _removeMds(id) {
  let i = _mds.findIndex((mds) => {
    return mds.id === id;
  });
  _mds.splice(i, 1);
}

function _addSyncedProtocol(mdsId, protocol) {
  const mds = mdss.find(({ id }) => mdsId === id);
  mds.protocols.push(protocol);
}

function _removeSyncedProtocol(mdsId, protocolId) {
  const mds = mdss.find(({ id }) => mdsId === id);
  const i = mds.protocols.findIndex(({ id }) => protocolId === id);
  mds.protocols.splice(i, 1);
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
      case OrganizationActions.SWITCH_ACTIVE_ORG:
        _clearMds();
        this.emitChange();
        break;

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
        _fetchMds(action.mds);
        this.emitChange();
        break;
      case MdsActions.LIST_MDS:
        _listMds(action.mds);
        this.emitChange();
        break;

      case MdsActions.FETCH_PROTOCOLS:
        _updateMds(action.id, { protocols: action.protocols });
        this.emitChange();
        break;
      case MdsActions.ADD_PROTOCOL:
        _updateMds(action.id, {
          protocols: [...this.get(action.id).protocols, action.protocol],
        });
        this.emitChange();
        break;
      case MdsActions.REMOVE_PROTOCOL:
        _removeSyncedProtocol(action.mdsId, action.protocolId);
        this.emitChange();
        break;

      default: break;
    }
  }

  listMds(organizationId) {
    return api.get(`/organizations/${organizationId}/mds_links/`)
      .then(({ body: { data } }) => MdsActionCreator.listMds(data));
  }

  fetchMds(organizationId, mdsId) {
    return api.get(`/organizations/${organizationId}/mds_links/${mdsId}`)
      .then(({ body: { data } }) => MdsActionCreator.fetchMds(data));
  }

  updateMds(organizationId, mdsId, name, url) {
    return api.put(`/organizations/${organizationId}/mds_links/${mdsId}`)
      .send({ name, url })
      .then(({ body: { data } }) => MdsActionCreator.updateMds(mdsId, data));
  }

  createMds(organizationId, name, url) {
    return api.post(`/organizations/${organizationId}/mds_links/`)
      .send({ name, url })
      .then(({ body: { data } }) => MdsActionCreator.createMds(data));
  }

  removeMds(organizationId, mdsId) {
    return api.delete(`/organizations/${organizationId}/mds_links/${mdsId}`)
      .then(() => MdsActionCreator.removeMds(mdsId));
  }

  fetchSyncedProtocols(organizationId, id) {
    return api.get(`/organizations/${organizationId}/mds_links/${id}/protocols/`)
      .then(({ body: { data } }) => MdsActionCreator.fetchSyncedProtocols(id, data));
  }

  createSyncedProtocol(organizationId, mdsId, protocolId) {
    return api.post(`/organizations/${organizationId}/mds_links/${id}/protocols/`)
      .send({ protocolId })
      .then(({ body: { data } }) => MdsActionCreator.createSyncedProtocol(id, data));
  }

  removeSyncedProtocol(organizationId, mdsId, protocolId) {
    return api.delete(`/organizations/${organizationId}/mds_links/${id}/protocols/${protocolId}`)
      .then(({ body: { data } }) => MdsActionCreator.removeSyncedProtocol(id, protocolId));
  }

  synchronize(organizationId, mdsId) {
    return api.post(`/organizations/${organizationId}/mds_links/${id}/synchronize`)
      .then(() => MdsActionCreator.synchronize(organizationId, mdsId));
  }
}

export default new MdsStore();
