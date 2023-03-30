import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import user from './modules/user'
// import category from './modules/category'
// import country from './modules/country'
// import comment from './modules/comment'
// import movie from './modules/movie'

export default createStore({
  plugins: [createPersistedState()],
  modules: {
    user,
    // category,
    // comment,
    // country,
    // movie
  },
})
