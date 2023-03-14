export default {
  GET_COUNTRY(state, data) {
    state.country = data
  },
  POST_COUNTRY(state, data) {
    state.country.unshift(data)
  },
  PUT_COUNTRY(state, data) {
    state.country.forEach(element => {
      if(element.id === data.id){
        return 0;
      }
    });
  },
};
