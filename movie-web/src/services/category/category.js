import BaseService from "../base";

class categoryService extends BaseService {
    get entity() {
        return "category"
    }

    async getAll() {
        try {
            const res = await this.request().get(`${this.entity}`)
            return res
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

export default new categoryService();
