import AppDispatcher from '../dispatcher/AppDispatcher';
import UserActions from '../actions/ProtocolActions';
import StoreActions from '../actions/StoreActions';
import docCookies from 'mozilla-doc-cookies';
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

    let cookie = JSON.parse(docCookies.getItem('sana_AUTH_TOKEN_KEY'));

    if(cookie) {
      let user_data = cookie.USER_KEY;
      user_data.auth_token = cookie.AUTH_TOKEN_KEY;

      _setUser(user_data);
    }
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
}

export default new UserStore();
