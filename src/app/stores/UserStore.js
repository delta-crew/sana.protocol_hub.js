import AppDispatcher from '../dispatcher/AppDispatcher';
import UserActions from '../actions/UserActions';
import StoreActions from '../actions/StoreActions';
import docCookies from 'mozilla-doc-cookies';
import api from './api';
import { EventEmitter } from 'events';

let _user = {
  name: 'Test User',
};

let _users = [];

function _setUser(user) {
  _user = user;
}

function _setUsers(users) {
  _users = users;
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

      api.setToken(user_data.auth_token);
    }
  }

  getUser() {
    return _user;
  }

  getUsers() {
    return _users;
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

      case UserActions.FETCH_USERS:
    }
  }

  fetchMe() {
    return api.get('/users/me')
      .then(({ data }) => UserActionCreator.fetchMe(data));
  }

  fetchUsers(query) {
    return api.get('/users/')
      .query({ query })
      .then(({ data }) => UserActionCreator.fetchUsers(data));
  }
}

export default new UserStore();
