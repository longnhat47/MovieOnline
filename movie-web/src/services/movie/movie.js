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

    async getAllAdmin() {
        try {
            return await this.request().get(`${this.entity}-admin`)
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

    async getBestView() {
        try {
            return await this.request().get(`${this.entity}/best-view`)
        } catch (e) {
            return e.response
        }
    }

    async getTopView() {
        try {
            return await this.request().get(`${this.entity}/list-best-view`)
        } catch (e) {
            return e.response
        }
    }

    async create(data) {
        try {
            const form = new FormData()
            for(const [key, value] of Object.entries(data)) {
                form.append(`${key}`, value)
            }
            return await this.request().post(`${this.entity}/create`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
        } catch (e) {
            return e.response
        }
    }

    async update(data) {
        try {
            const form = new FormData()
            for(const [key, value] of Object.entries(data)) {
                form.append(`${key}`, value)
            }
            return await this.request().patch(`${this.entity}/${data['id']}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
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
