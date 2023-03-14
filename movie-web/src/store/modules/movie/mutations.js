export default {
  GET_MOVIE(state, data) {
    state.movie = data
  },
  GET_TOP_MOVIE(state, data) {
    state.hotMovie = data
  },
  POST_MOVIE(state, data) {
    state.movie.unshift(data)
  },
  PUT_MOVIE(state, data) {
    state.movie.forEach(element => {
      if(element.id === data.id){
        return 0;
      }
    });
  },
};
