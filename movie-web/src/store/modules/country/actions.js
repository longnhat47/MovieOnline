import countryService from "@/services/country/country"


export default {
    async fetchCountry({ commit }) {
        const res = await countryService.getAll()
        commit("GET_COUNTRY", res.data)
        return res.data
    },
    async createCountry({ commit }, data) {
        const res = await countryService.create(data)
        commit("POST_COUNTRY", res.data)
        console.log(res.status)
        return res
    },
    async updateCountry({ commit }, data) {
        console.log(data)
        const res = await countryService.update(data)
        commit("PUT_COUNTRY", res.data)
        console.log(res)
        return res
    },
    /* eslint-disable */
    async deleteCountry({ commit }, data) {
        const res = await countryService.delete(data.id)
        // commit("DELETE_COUNTRY", data)
        return res
    }
};
