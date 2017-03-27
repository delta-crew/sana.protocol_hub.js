import AppDispatcher from '../dispatcher/AppDispatcher';
import MdsActions from '../actions/MdsActions';

class MdsActionCreator {
  listMds(mds) {
    AppDispatcher.notify({
      type: MdsActions.LIST_MDS,
      mds,
    });
  }

  fetchMds(mds) {
    AppDispatcher.notify({
      type: MdsActions.FETCH_MDS,
      mds,
    });
  }

  removeMds(id) {
    AppDispatcher.notify({
      type: MdsActions.DELETE_MDS,
      id,
    });
  }

  createMds(mds) {
    AppDispatcher.notify({
      type: MdsActions.CREATE_MDS,
      mds,
    });
  }

  updateMds(id, mds) {
    AppDispatcher.notify({
      type: MdsActions.UPDATE_MDS,
      id,
      updates: mds,
    });
  }

  fetchSyncedProtocols(id, protocols) {
    AppDispatcher.notify({
      type: MdsActions.FETCH_PROTOCOLS,
      id,
      protocols,
    });
  }

  addSyncedProtocol(id, protocol) {
    AppDispatcher.notify({
      type: MdsActions.ADD_PROTOCOL,
      id,
      protocol,
    });
  }

  removeSyncedProtocol(mdsId, protocolId) {
    AppDispatcher.notify({
      type: MdsActions.REMOVE_PROTOCOL,
      mdsId,
      protocolId,
    });
  }

  removeSyncedProtocol(organizationId, mdsId) {
    AppDispatcher.notify({
      type: MdsActions.SYNCHRONIZE,
      organizationId,
      mdsId,
    });
  }
}

export default new MdsActionCreator();
