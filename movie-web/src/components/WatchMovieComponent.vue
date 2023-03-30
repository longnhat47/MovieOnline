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
            <textarea ref="commentArea" class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"
              v-model="comment"></textarea>
            <label  for="floatingTextarea2">Comments</label>
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
import movieService from '@/services/movie/movie'
import commentService from '@/services/comment/comment'
import moment from 'moment'
import API_MEDIA from '../../env'

export default {
  data() {
    return {
      img: API_MEDIA,
      title: '',
      movie: '',
      comment: ''
    }
  },
  computed: {
  },
  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
      }
      return 'NAN'
    },
    async commentFunc() {
      if (localStorage.getItem('token') != null) {
        await commentService.create({ movie: this.$route.params.id, content: this.comment })
        const update = await await movieService.get(this.$route.params.id)
        this.movie.comment = update.data.comment
        this.comment = ''
      } else {
        this.$router.push('/login')
      }
    }
  },
  async created() {
    try {
      const {data: movie} = await movieService.get(this.$route.params.id)
      this.title = movie.category.name + '>' + movie.name
      this.movie = movie
      await movieService.updateView(this.$route.params.id)
    } catch (e) {
      this.$router.push('/404')
    }

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
      .user-img-comment {
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
}
</style>
