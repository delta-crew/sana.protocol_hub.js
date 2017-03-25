import AppDispatcher from '../dispatcher/AppDispatcher';
import ProtocolActions from '../actions/ProtocolActions';

class ProtocolActionCreator {
  fetchProtocols(protocols) {
    ProtocolActions.notify({
      type: ProtocolActions.FETCH_PROTOCOLS,
      protocols,
    });
  }

  fetchPublicProtocols(protocols) {
    ProtocolActions.notify({
      type: ProtocolActions.FETCH_PUBLIC_PROTOCOLS,
      protocols,
    });
  }

  fetchOrganizationProtocols(protocols) {
    ProtocolActions.notify({
      type: ProtocolActions.FETCH_ORGANIZATION_PROTOCOLS,
      protocols,
    });
  }

  fetchProtocol(protocol) {
    ProtocolActions.notify({
      type: ProtocolActions.FETCH_PROTOCOL,
      protocol,
    });
  }

  fetchProtocolVersions(id, versions) {
    ProtocolActions.notify({
      type: ProtocolActions.FETCH_PROTOCOL,
      id,
      versions,
    });
  }

  removeProtocolFromOrganization(organizationId, id) {
    ProtocolActions.notify({
      type: ProtocolActions.REMOVE_PROTOCOL,
      id,
    });
  }

  addProtocolToOrganization(organizationId, protocol) {
    ProtocolActions.notify({
      type: ProtocolActions.REMOVE_PROTOCOL,
      protocol,
    });
  }

  updateProtocol(id, protocol) {
    ProtocolActions.notify({
      type: ProtocolActions.UPDATE_PROTOCOL,
      id,
      updates: protocol,
    });
  }
}

export default new ProtocolActionCreator();
