import movieService from "@/services/movie/movie"


export default {
    async fetchMovie({ commit }) {
        const res = await movieService.getAll()
        commit("GET_MOVIE", res.data)
        return res.data
    },
    async fetchMovieDetail({ commit }, id) {
        const res = await movieService.get(id)
        commit("GET_MOVIE", res.data)
        return res.data
    },
    async createMovie({ commit }, data) {
        const res = await movieService.create(data)
        commit("POST_MOVIE", res.data)
        console.log(res.status)
        return res
    },
    async updateMovie({ commit }, data) {
        console.log(data)
        const res = await movieService.update(data)
        commit("PUT_MOVIE", res.data)
        console.log(res)
        return res
    },
    /* eslint-disable */
    async updateViewMovie({ commit }, data) {
        console.log(data)
        const res = await movieService.updateView(data)
        // commit("PUT_MOVIE", res.data)
        console.log(res)
        return res
    },
    /* eslint-disable */
    async deleteMovie({ commit }, data) {
        const res = await movieService.delete(data.id)
        // commit("DELETE_MOVIE", data)
        return res
    }
};
