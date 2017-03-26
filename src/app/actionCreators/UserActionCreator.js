import AppDispatcher from '../dispatcher/AppDispatcher';
import UserActions from '../actions/UserActions';

class UserActionCreator {
  fetchMe(user) {
    AppDispatcher.notify({
      type: UserActions.LOGIN,
      user,
    });
  }

  fetchUsers(users) {
    AppDispatcher.notify({
      type: UserActions.FETCH_USERS,
      users,
    });
  }
}

export default new UserActionCreator();
