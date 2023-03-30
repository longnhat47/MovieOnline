<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="row">
          <div class="container text-center">
            <h3 class="col-2">Cập nhật</h3>
            <div class="form bg-light border border-dark-subtle rounded p-5">
              <div class="mb-3 row">
                <label for="inputName" class="col-sm-2 col-form-label text-dark">Họ tên</label>
                <div class="col-sm-10">
                  <input type="text" required class="form-control" id="inputName" :value="data.full_name"
                    @change="dataModel.full_name = $event.target.value">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputBirthday" class="col-sm-2 col-form-label text-dark">Ngày sinh</label>
                <div class="col-sm-10">
                  <input type="date" required class="form-control" id="inputBirthday" :value="data.birthday"
                    @change="dataModel.birthday = $event.target.value">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="image" class="col-sm-2 col-form-label text-dark">Image</label>
                <div class="col-sm-10">
                  <input ref="imageFile" type="file" class="form-control" id="image" @change="getImage">
                </div>
              </div>
              <div class="mb-3 row text-center">
                <div class="col-sm-6">
                  <button class="btn btn-secondary me-5" @click="this.$router.back()">Quay lại</button>
                  <button class="btn btn-primary" @click="updateFunc">Cập nhật</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      data: '',
      dataModel: {
        id: '',
        full_name: '',
        birthday: '',
        image: ''
      },
    }
  },
  computed: {
    ...mapState('user', ['currentUser',]),
  },
  methods: {
    ...mapActions('user', ['updateProfile']),
    async updateFunc() {
      console.log(typeof (this.dataModel.image))
      if (this.dataModel.image == null || this.dataModel.image.name == null) {
        delete this.dataModel.image
      }
      console.log(this.dataModel)
      const res = await this.updateProfile(this.dataModel)
      console.log(res)
      for (const [key, value] of Object.entries(res.data)){
      if(this.currentUser[key] == res.data[key]){
        this.currentUser[value] = res.data[value]
      }
    }
    },
    getImage() {
      this.dataModel.image = this.$refs.imageFile.files[0]
    }
  },
  created() {
    this.data = this.currentUser
    for(const key of Object.keys(this.data)){
      this.dataModel[key] = this.data[key]
    }
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






  .movie-list {
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
