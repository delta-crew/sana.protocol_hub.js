import AppDispatcher from '../dispatcher/AppDispatcher';
import UserActions from '../actions/UserActions';

class UserActionCreator {
  fetchMe(user) {
    UserActions.notify({
      type: UserActions.LOGIN,
      user,
    });
  }

  fetchUsers(users) {
    UserActions.notify({
      type: UserActions.FETCH_USERS,
      users,
    });
  }
}

export default new UserActionCreator();
