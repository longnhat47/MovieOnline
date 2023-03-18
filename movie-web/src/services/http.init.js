import axios from 'axios'
import env from "../../env";

export default class Http {

  constructor(status) {
    this.handlerEnabled =
      status && status.handlerEnabled ? status.handlerEnabled : false;
    this.instance = axios.create({
      baseURL: env.API_URL,
    });
    return this.init();
  }

  async checkToken(token) {
    try {
      var res = await axios.post('http://127.0.0.1:8000/api/token/verify/', { 'token': token })

    } catch (error) {
      return error.response;
    }
    return res
  }

  async requestHandler(request) {
    const store = require("../store");
    console.log('store')
    console.log(store.default.state)
    const token = localStorage.getItem('token')
    if (token != null) {
      var res = await this.checkToken(token)
      if (res.status == 401) {
        localStorage.removeItem('token');
        store.default.state.user.currentUser = null
        console.log(window.location.href = '/')
      }
      if (res.status == 200) {
        const authenticated = !request.url.startsWith("login");
        if (authenticated) {
          request.headers["Authorization"] = `Bearer ${token}`
        }
      }
    }
    return request;
  }

  errorHandler(error) {
    if (error?.response?.status === 401) {
      return error.response
    }
    console.log(error)
    return Promise.reject(error);
  }

  successHandler(response) {
    if (this.handlerEnabled) {
      return response; // TODO: Handle Success Response if need
    }
    return response;
  }

  init() {
    this.instance.interceptors.request.use((request) =>
      this.requestHandler(request)
    );
    this.instance.interceptors.response.use(
      (response) => this.successHandler(response),
      (error) => this.errorHandler(error)
    );
    return this.instance;
  }
}
