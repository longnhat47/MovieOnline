import movieService from "@/services/movie/movie"


export default {
    async fetchMovie({ commit }) {
        const res = await movieService.getAll()
        commit("GET_MOVIE", res.data)
        return res.data
    },
    async fetchMovieAdmin({ commit }) {
        const res = await movieService.getAllAdmin()
        commit("GET_MOVIE", res.data)
        return res.data
    },
    async fetchMovieDetail({ commit }, id) {
        const res = await movieService.get(id)
        commit("GET_MOVIE", res.data)
        return res.data
    },
    async fetchMovieTopView({ commit }) {
        const res = await movieService.getTopView()
        commit("GET_TOP_MOVIE", res.data)
        return res.data
    },
    /* eslint-disable */
    async createMovie({ commit }, data) {
        const res = await movieService.create(data)
        console.log(res)
        // commit("POST_MOVIE", res.data)
        return res
    },
    async updateMovie({ commit }, data) {
        const res = await movieService.update(data)
        commit("PUT_MOVIE", res.data)
        return res
    },
    async updateViewMovie({ commit }, data) {
        const res = await movieService.updateView(data)
        // commit("PUT_MOVIE", res.data)
        console.log(res)
        return res
    },
    async deleteMovie({ commit }, data) {
        const res = await movieService.delete(data.id)
        // commit("DELETE_MOVIE", data)
        return res
    }
};
