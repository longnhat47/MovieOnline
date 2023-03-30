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
  async updateProfile({ commit }, data){
    const res = await userService.updateProfile(data)
    console.log(res)
    commit("UPDATE_PROFILE", res.data)
    return res
  },
  async updateUser({ commit },data){
    console.log('data action')
    console.log(data)
    const res = await userService.updateUser(data)
    return res
  },
  async updatePassword({ commit },data){
    console.log('data action')
    console.log(data)
    const res = await userService.updatePassword(data)
    return res.data
  },
  resetProfile({ commit }) {
    commit("RESET_USER")
    return 0
  },
  async deleteUser({ commit }, data){
    const res = await userService.delete(data.id)
    commit("DELETE_USER", res.data)
    return res.data
  },
};
