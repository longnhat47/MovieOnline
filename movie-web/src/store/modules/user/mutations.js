export default {
  GET_ALL_USER(state, data) {
    state.users = data
  },
  SET_USER(state, data) {
    state.currentUser = data.user
  },
  RESET_USER(state, data) {
    state.currentUser.user = data.user
  },
  DELETE_USER(state, data) {
    console.log(state.users)
    var i = 0;
    while (i < state.users.length) {
      if (state.users[i].id === data.id) {
        state.users.splice(i, 1);
        break;
      } else {
        ++i;
      }
    }
  },
  LOG_OUT(state) {
    state.currentUser = ''
  },
  UPDATE_PROFILE(state, data) {
    for (var [key1, value] of Object.entries(data)) {
      state.currentUser[key1] = value
    }
    console.log(state.currentUser)
  }
};
