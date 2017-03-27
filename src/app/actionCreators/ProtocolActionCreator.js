import AppDispatcher from '../dispatcher/AppDispatcher';
import ProtocolActions from '../actions/ProtocolActions';

class ProtocolActionCreator {
  fetchProtocols(protocols) {
    AppDispatcher.notify({
      type: ProtocolActions.FETCH_PROTOCOLS,
      protocols,
    });
  }

  fetchPublicProtocols(protocols) {
    AppDispatcher.notify({
      type: ProtocolActions.FETCH_PUBLIC_PROTOCOLS,
      protocols,
    });
  }

  fetchOrganizationProtocols(protocols) {
    AppDispatcher.notify({
      type: ProtocolActions.FETCH_ORGANIZATION_PROTOCOLS,
      protocols,
    });
  }

  fetchProtocol(protocol) {
    AppDispatcher.notify({
      type: ProtocolActions.FETCH_PROTOCOL,
      protocol,
    });
  }

  fetchProtocolVersions(id, versions) {
    AppDispatcher.notify({
      type: ProtocolActions.FETCH_PROTOCOL_VERSIONS,
      id,
      versions,
    });
  }

  removeProtocolFromOrganization(organizationId, id) {
    AppDispatcher.notify({
      type: ProtocolActions.REMOVE_PROTOCOL,
      id,
    });
  }

  addProtocolToOrganization(organizationId, protocol) {
    AppDispatcher.notify({
      type: ProtocolActions.REMOVE_PROTOCOL,
      protocol,
    });
  }

  updateProtocol(id, protocol) {
    AppDispatcher.notify({
      type: ProtocolActions.UPDATE_PROTOCOL,
      id,
      updates: protocol,
    });
  }
}

export default new ProtocolActionCreator();
