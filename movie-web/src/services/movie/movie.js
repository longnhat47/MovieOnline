import BaseService from "../base";

class movieService extends BaseService {
    get entity() {
        return "movie"
    }

    async getAll() {
        try {
            return await this.request().get(`${this.entity}`)
        } catch (e) {
            return e.response
        }
    }

    async get(id) {
        try {
            return await this.request().get(`${this.entity}/detail/${id}`)
        } catch (e) {
            return e.response
        }
    }

    async create(data) {
        try {
            return await this.request().post(`${this.entity}/create`, data)
        } catch (e) {
            return e.response
        }
    }

    async update(data) {
        try {
            return await this.request().put(`${this.entity}/${data['id']}`, data)
        } catch (e) {
            return e.response
        }
    }

    async updateView(data) {
        try {
            return await this.request().put(`${this.entity}/update-view/${data}`, data)
        } catch (e) {
            return e.response
        }
    }

    async delete(id) {
        try {
            return await this.request().delete(`${this.entity}/${id}`)
        } catch (e) {
            return e.response;
        }
    }

}

export default new movieService();
