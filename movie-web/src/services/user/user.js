import BaseService from "@/services/base";

class UserService extends BaseService {
    get entity() {
        return "user"
    }

    async getUsers() {
        try {
            return await this.request().get(`${this.entity}`)
        } catch (e) {
            return e.response
        }
    }

    async login(data) {
        try {
            return await this.request().post(`${this.entity}/login`, data)
        } catch (e) {
            return e.response
        }
    }

    async register(data) {
        try {
            return await this.request().post(`${this.entity}/register`, data)
        } catch (e) {
            return e.response
        }
    }

    async delete(id) {
        try {
            return await this.request().delete(`${this.entity}/${id}`)
        } catch (e) {
            return e.response
        }
    }

    async updateProfile(data) {
        try {
            return await this.request().put(`${this.entity}/?id=${data.id}`, data)
        } catch (e) {
            return e.response
        }
    }

    async updatePassword(data) {
        try {
            return await this.request().put(`${this.entity}/change-password/?id=${data.id}`, data)
        } catch (e) {
            return e.response
        }
    }
}

export default new UserService();
