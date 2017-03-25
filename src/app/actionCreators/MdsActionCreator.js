import AppDispatcher from '../dispatcher/AppDispatcher';
import MdsActions from '../actions/MdsActions';

class MdsActionCreator {
  listMds(mds) {
    MdsActions.notify({
      type: MdsActions.FETCH_MDS,
      mds,
    });
  }

  fetchMds(mds) {
    MdsActions.notify({
      type: MdsActions.FETCH_MDS,
      mds,
    });
  }

  removeMds(id) {
    MdsActions.notify({
      type: MdsActions.REMOVE_MDS,
      id,
    });
  }

  createMds(mds) {
    MdsActions.notify({
      type: MdsActions.CREATE_MDS,
      mds,
    });
  }

  updateMds(id, mds) {
    MdsActions.notify({
      type: MdsActions.UPDATE_MDS,
      id,
      updates: mds,
    });
  }

  fetchSyncedProtocols(id, protocols) {
    MdsActions.notify({
      type: MdsActions.FETCH_PROTOCOLS,
      id,
      protocols,
    });
  }

  addSyncedProtocol(id, protocol) {
    MdsActions.notify({
      type: MdsActions.ADD_PROTOCOL,
      id,
      protocol,
    });
  }

  removeSyncedProtocol(mdsId, protocolId) {
    MdsActions.notify({
      type: MdsActions.REMOVE_PROTOCOL,
      mdsId,
      protocolId,
    });
  }
}

export default new MdsActionCreator();
