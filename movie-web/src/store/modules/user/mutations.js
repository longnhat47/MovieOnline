export default {
  GET_ALL_USER(state, data){
    state.users = data
  },
  SET_USER(state, data) {
    state.currentUser = data
  },
  RESET_USER(state, data) {
    state.currentUser.user = data.user
  },
  DELETE_USER(){
    // state.currentUser = null
  },
  LOG_OUT(state){
    state.currentUser.user = ''
    state.currentUser.token = ''
  }
};
