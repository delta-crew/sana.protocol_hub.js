import AppDispatcher from '../dispatcher/AppDispatcher';
import UserActions from '../actions/ProtocolActions';
import StoreActions from '../actions/StoreActions';
import request from 'superagent-bluebird-promise';
import { EventEmitter } from 'events';

let _user = {
  name: 'Test User',
};

function _setUser(user) {
  _user = user;
}

class UserStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    // fetch here?
  }

  getUser() {
    return _user;
  }

  loggedIn() {
    return !(0 === Object.keys(_user).length && Object === _user.constructor);
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
      case UserActions.LOGIN:
        _setUser(action.user);
        this.emitChange();
        break;
      case UserActions.LOGOUT:
        _setUser({});
        this.emitChange();
        break;
    }
  }

  fetchUser() {
    // TODO API call
  }
}

export default new UserStore();
