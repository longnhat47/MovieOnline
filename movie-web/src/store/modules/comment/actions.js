import commentService from "@/services/comment/comment"


export default {
    async fetchComment({ commit }) {
        const res = await commentService.getAll()
        commit("GET_COMMENT", res.data)
        return res.data
    },
    async createComment({ commit }, data) {
        const res = await commentService.create(data)
        commit("POST_COMMENT", res.data)
        console.log(res.status)
        return res
    },
    async updateComment({ commit }, data) {
        console.log(data)
        const res = await commentService.update(data)
        commit("PUT_COMMENT", res.data)
        console.log(res)
        return res
    },
    /* eslint-disable */
    async deleteComment({ commit }, data) {
        const res = await commentService.delete(data.id)
        // commit("DELETE_COMMENT", data)
        return res
    }
};
