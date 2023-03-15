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

  requestHandler(request) {
    const store = require("@/store");
    console.log('store')
    console.log(store.default.state)
    // // const token = localStorage.getItem('token')
    const token = store ? store.default.state.user.currentUser.token.access : null;
    if(token){
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    // const authenticated = !request.url.startsWith("login");

    // if (authenticated && token) {
    //   const { access_token } = token;
    //   if (access_token && access_token.length !== 0) {

    //     // window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    //   }
    // }
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
