<template>
  <div class="home">
    <div class="container">
      <div class="row main-show">
        <div class="row mb-2">
          <h3 class="col-10">Phim hot</h3>
          <div class="col-2 text-end">
            <a href="#" class="btn btn-secondary btn-sm show-more-btn">Xem tất cả</a>
          </div>
        </div>
        <div class="row mb-4" >
          <div class="col-5 movie-item movie-item-main" >
            <!-- <router-link :to="{name: 'Movie', params: {id : hotMovie[0].id}}" class="movie-link"><img -->
            <router-link :to="'movie/'+hotMovie[0].id" class="movie-link"><img
                :src="hotMovie[0].thumbnail" class="movie-thumbnail"
                alt="thumbnail"><i class="icon-play"></i><span class="movie-name">{{hotMovie[0].name}}</span></router-link>
          </div>
          <div class="col-7">
            <div class="row">
              <div class="col-4 movie-item" v-for="m in hotMovie.slice(1,7)" :key="m.id">
                <router-link :to="'movie/'+m.id" class="movie-link"><img
                    :src="m.thumbnail"
                    class="movie-thumbnail" alt="thumbnail"><i class="icon-play"></i><span class="movie-name">{{m.name}}</span></router-link>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row">
        <div class="row mb-2">
          <h3 class="col-10">Phim</h3>
          <div class="col-2 text-end">
            <a href="#" class="btn btn-secondary btn-sm show-more-btn">Xem tất cả</a>
          </div>
        </div>
        <div class="row sub-show">
          <div class="col-4 movie-item" v-for="m in movie.slice(0,9)" :key="m.id">
            <router-link :to="'movie/'+m.id"  class="movie-link"><img
                :src="m.thumbnail"
                class="movie-thumbnail" alt="thumbnail"><i class="icon-play"></i><span class="movie-name">{{m.name}}</span></router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data(){
    return{
    }
  },
  computed:{
    ...mapState('movie', ['movie','hotMovie']),
  },
  methods: {
    ...mapActions('movie',['fetchMovie', 'fetchMovieTopView']),

  },
  created(){
    this.fetchMovieTopView();
    this.fetchMovie();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #ccc;
}

.home {
  min-height: 90vh;
  background-color: #1a1a1a;
  padding: 48px;
  color: #ccc;

  // .show-more-btn{
  //   font-size: 16px;
  // }
  .movie-item {
    .movie-link {
      position: relative;
      display: block;
      margin: 4px;
      overflow: hidden;


      .movie-thumbnail {
        transition: all .3s ease-in-out;
        object-fit: cover;
      }

      .icon-play {
        background: #ff9601;
        height: 50px;
        width: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -25px 0 0 -25px;
        border-radius: 50%;
        opacity: 0;
        transform: scale(1.5);
        transition: all .3s ease-in-out;
      }

      .icon-play::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        border: 15px solid transparent;
        border-left: 20px solid #fff;
        margin: -15px 0 0 -6px;
      }

      .movie-name {
        position: absolute;
        top: 110px;
        left: 0;
        padding: 8px;
        background-color: rgba($color: #000000, $alpha: 0.7);
        min-height: 28px;
        font-size: 12px;
        width: 100%;
      }
    }
  }

  .movie-item:hover .movie-thumbnail {
    transform: scale(1.2);
  }

  .movie-item:hover .icon-play {
    transform: scale(1);
    opacity: .8;
  }




  .movie-item-main.movie-item .movie-name {
    top: 257px;

    font-size: 18px;

  }


  .main-show {
    .movie-item-main.movie-item {
      .movie-link {
        height: 300px;

        .movie-thumbnail {
          height: 100%;
          width: 100%;
        }
      }

    }

    .movie-item {
      .movie-link {
        height: 144px;

        .movie-thumbnail {
          height: 100%;
          width: 100%;
        }
      }
    }
  }

  .sub-show {
    .movie-item {
      .movie-link {
        height: 220px;

        .movie-thumbnail {
          height: 100%;
          width: 100%;
        }

        .movie-name {
          top: 180px;
          font-size: 16px;

        }
      }
    }
  }



}
</style>
