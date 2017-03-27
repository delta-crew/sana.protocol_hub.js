import AppDispatcher from '../dispatcher/AppDispatcher';
import UserActions from '../actions/UserActions';
import UserActionCreator from '../actionCreators/UserActionCreator';
import StoreActions from '../actions/StoreActions';
import docCookies from 'mozilla-doc-cookies';
import api from './api';
import { EventEmitter } from 'events';

let _user = {};

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
    // TODO Don't hardcode!
    this.builderUrl = 'http://localhost:8080';
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));

    let cookie = JSON.parse(docCookies.getItem('sana_AUTH_TOKEN_KEY'));

    if(cookie) {
      let user_data = cookie.USER_KEY;
      user_data.auth_token = cookie.AUTH_TOKEN_KEY;

      _setUser(user_data);

      api.setToken(user_data.auth_token);
    } else {
      window.location = this.builderUrl + '/en/login/hub';
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
      case UserActions.LOGIN:
        _setUser(action.user);
        this.emitChange();
        break;
      case UserActions.LOGOUT:
        _setUser({});
        this.emitChange();
        break;

      case UserActions.FETCH_USERS:
        _setUsers(action.users);
        this.emitChange();
        break;
    }
  }

  fetchMe() {
    return api.get('/users/me')
      .then(({ body: { data } }) => UserActionCreator.fetchMe(data));
  }

  fetchUsers(query) {
    return api.get('/users/')
      .query({ query })
      .then(({ body: { data } }) => UserActionCreator.fetchUsers(data));
  }
}

export default new UserStore();
