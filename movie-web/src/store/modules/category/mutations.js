export default {
  GET_CATEGORY(state, data) {
    state.category = data
  },
  POST_CATEGORY(state, data) {
    state.category.unshift(data)
  },
  PUT_CATEGORY(state, data) {
    state.category.forEach(element => {
      if(element.id === data.id){
        element.name = data.name;
        return 0;
      }
    });
  },
};
