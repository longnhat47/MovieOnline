<template>
  <div class="movie-detail mt-5">
    <div class="container">
      <p class="movie-name">Xem phim>{{ title }}</p>
      <video :src="movie.video" controls class="video object-fit-fill"></video>
      <p class="movie-desc mt-3">Mô tả: {{ movie.description }}</p>
      <div class="review mt-5 mb-5">
        <div class="review-form">
          <p>Bình luận</p>
          <div class="form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
              style="height: 100px" v-model="comment"></textarea>
            <label for="floatingTextarea2">Comments</label>
          </div>
          <button class="btn btn-primary mt-2" @click="commentFunc">Bình luận</button>
        </div>
        <div class="review-item mt-5" v-for="c in movie.comment" :key="c.id">
          <div class="row d-flex">
            <div class="row col-2">
              <div class="col-4">
                <img :src="'http://127.0.0.1:8000' + c.user.image" alt="user"
                  class="rounded-circle object-fit-cover user-img-comment">
              </div>
              <div class="row col-8">
                <p class="user-name-comment">{{ c.user.full_name }}</p>
                <p class="comment">{{ c.content }}</p>
              </div>
            </div>
            <div class="col-4">
              <p class="comment-date">{{ formatDate(c.created_at) }}</p>
            </div>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import API_MEDIA from '../../env'

export default {
  data() {
    return {
      img: API_MEDIA,
      title: '',
      comment: ''
    }
  },
  computed: {
    ...mapState('movie', ['movie']),
    ...mapState('user', ['currentUser']),
  },
  methods: {
    ...mapActions('movie', ['fetchMovieDetail', 'updateViewMovie']),
    ...mapActions('comment', ['createComment']),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
      }
      return 'NAN'
    },
    commentFunc(){
      if(this.currentUser.token){
        this.createComment({movie: this.$route.params.id, content: this.comment})
        this.$router.go(this.$router.currentRoute)
      }else{
        this.$router.push('/login')
      }
    }
  },
  created() {
    this.fetchMovieDetail(this.$route.params.id).then((o) => {
      this.title = o.category.name+'>'+ o.name
    }).finally(() => this.updateViewMovie(this.$route.params.id))

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.movie-detail {
  min-height: 100vh;

  .movie-name {
    font-size: 22px;
  }

  .video {
    max-width: 100%;
  }

  .review {
    .review-item {
      .user-img-comment{
        width: 100%;
        min-height: 50%;
      }
      .user-name-comment {
        display: block;
        padding-left: 0;
        font-size: 18px;
      }

      .comment-date {
        font-size: 12px;
        color: cadetblue;
      }
    }
  }
}</style>
