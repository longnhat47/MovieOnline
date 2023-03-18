import userService from "@/services/user/user"


export default {
  async fetchUser ({ commit }) {
    const user = await userService.getUsers()
    commit("GET_ALL_USER", user.data)
    return user.data
  },
  async loginUser ({ commit }, data) {
    const res = await userService.login(data)
    commit("SET_USER", res.data)
    return res
  },
  /* eslint-disable */
  async register ({ commit }, data) {
    const res = await userService.register(data)
    return res
  },
  logout({ commit }) {
    commit("LOG_OUT")
    return 0
  },
  async updateUser(data){
    console.log('data action')
    console.log(data)
    const res = await userService.updateProfile(data)
    return res
  },
  /* eslint-disable */
  async updatePassword({ commit }, data){
    console.log(data)
    const res = await userService.updatePassword(data)
    // commit("RESET_USER")
    return res.data
  },
  resetProfile({ commit }) {
    commit("RESET_USER")
    return 0
  },
  /* eslint-disable */
  async deleteUser({ commit }, data){
    const res = await userService.delete(data.id)
    commit("DELETE_USER", res.data)
    return res.data
  },
};
