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

    async deleteAdmin(id) {
        try {
            return await this.request().delete(`${this.entity}/${id}/admin`)
        } catch (e) {
            return e.response
        }
    }

    async updateProfile(data) {
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

    async updateUser(data) {
        try {
            const form = new FormData()
            for(const [key, value] of Object.entries(data)) {
                form.append(`${key}`, value)
            }
            return await this.request().patch(`${this.entity}/${data['id']}/admin`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
        } catch (e) {
            return e.response
        }
    }

    async updatePassword(data) {
        try {
            return await this.request().post(`${this.entity}/change-password/${data.id}`, data)
        } catch (e) {
            return e.response
        }
    }
}

export default new UserService();
