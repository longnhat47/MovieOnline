import BaseService from "../base";

class countryService extends BaseService {
    get entity() {
        return "country"
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
            return await this.request().get(`${this.entity}/${id}`)
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

    async delete(id) {
        try {
            return await this.request().delete(`${this.entity}/${id}`)
        } catch (e) {
            return e.response;
        }
    }

}

export default new countryService();
