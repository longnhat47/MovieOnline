export default {
  GET_COMMENT(state, data) {
    state.comment = data
  },
  POST_COMMENT(state, data) {
    state.comment.unshift(data)
  },
  PUT_COMMENT(state, data) {
    state.comment.forEach(element => {
      if(element.id === data.id){
        return 0;
      }
    });
  },
};
