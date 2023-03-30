<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <h3 class="col-3">Comment</h3>
      </div>
      <table class="table text-light">
        <thead>
          <tr class="row">
            <th class="col-1" scope="col">ID</th>
            <th class="col-2" scope="col">User</th>
            <th class="col-3" scope="col">Movie</th>
            <th class="col-4" scope="col">Content</th>
            <th class="col-2" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="row" v-for="(d, index) in data" :key="index">
            <th class="col-1" scope="row">{{ d.id }}</th>
            <td class="col-2">{{ d.user.email }}</td>
            <td class="col-3">{{ nameMovie(d.movie) }}</td>
            <td class="col-4">{{ d.content }}</td>
            <td class="col-2 d-flex justify-content-end">
              <button class="btn btn-secondary" @click="editModal(d)">Sửa</button>
              <button class="btn btn-danger ms-2" @click="deleteModal(d)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <div ref="modal" id="modal" class="modal" v-show="isShow" @click="hideModal">
        <!-- Edit -->
        <div class="modal-content" v-show="button.edit">
          <div class="row justify-content-end">
            <button class="btn-close me-3" @click="modalEvent('edit')"></button>
          </div>
          <div class="p-2">
            <label for="comment-movie" class="form-label">Phim</label>
            <select class="form-select" @change="dataModel.movie = $event.target.value" id="comment-movie"
              aria-label="Default select example">
              <option v-for="m in movie" :key="m.id" :value="m.id" :selected="m.id === dataModel.movie">
                {{ m.name }}
              </option>
            </select>
          </div>
          <div class="p-2">
            <label for="name" class="form-label">Nội dung</label>
            <input type="text" class="form-control" id="name" placeholder="Nội dung"
              @change="dataModel.content = $event.target.value" :value="dataModel.content">
          </div>
          <button class="col-1 btn btn-primary" @click="editModel()">Sửa</button>
        </div>
        <!-- Delete -->
        <div class="modal-content" v-show="button.delete">
          <div class="row justify-content-end">
            <button class="btn-close me-3" @click="modalEvent('delete')"></button>
          </div>
          <div class="p-4">
            <label ref="titleDelete" class="form-label text-danger fs-3 text-uppercase">Xóa</label>
          </div>
          <button class="col-1 btn btn-danger" @click="removeModel">Xóa</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import commentService from '@/services/comment/comment'
import movieService from '@/services/movie/movie'
export default {
  data() {
    return {
      data: null,
      dataModel: {
        id: '',
        movie: '',
        user: {},
        content: ''
      },
      isShow: false,
      button: {
        edit: false,
        delete: false,
      },
      movie: null
    }
  },
  components: {

  },
  computed: {
    nameMovie() {
      return (id) => {
        var name = ''
        if (this.movie) {
          this.movie.forEach((o) => {
            if (o.id == id) {
              name = o.name
            }
          })
        }
        return name
      }
    }
  },
  methods: {
    modalEvent(str) {
      switch (str) {
        case 'edit':
          this.isShow = !this.isShow;
          this.button.edit = !this.button.edit;
          break;
        case 'delete':
          this.isShow = !this.isShow;
          this.button.delete = !this.button.delete;
          break;
      }
    },
    hideModal(event) {
      if (event.target.id == 'modal') {
        this.$refs.modal.style.display = 'none'
      }
    },
    editModal(data) {
      for (const [key] of Object.entries(this.dataModel)) {
        this.dataModel[key] = data[key];
      }
      this.isShow = !this.isShow;
      this.button.edit = !this.button.edit;
    },
    deleteModal(data) {
      this.dataModel.id = data.id;
      this.isShow = !this.isShow;
      this.button.delete = !this.button.delete;
      const el = this.$refs.titleDelete
      el.innerHTML = `Bạn có muốn xóa bình luận của ${data.user.email}` + `<hr><span>Nội dung</span><h1>${data.content}</h1>`
    },
    async editModel() {
      const res = await commentService.update(this.dataModel)
      console.log(res.data)
      var i = 0;
      while (i < this.data.length) {
        if (this.data[i].id === this.dataModel.id) {
          for (const [key] of Object.entries(this.data[i])) {
            this.data[i][key] = this.dataModel[key];
          }
          break;
        } else {
          ++i;
        }
      }
      this.isShow = !this.isShow;
      this.button.edit = !this.button.edit;
    },
    removeModel() {
      commentService.delete(this.dataModel.id)
      var i = 0;
      while (i < this.data.length) {
        if (this.data[i].id === this.dataModel.id) {
          this.data.splice(i, 1);
          break;
        } else {
          ++i;
        }
      }
      this.isShow = !this.isShow;
      this.button.delete = !this.button.delete;
    }
  },
  async created() {
    const res = await Promise.all([commentService.getAll(), movieService.getAll()]) 
    this.data = res[0].data
    this.movie = res[1].data
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  min-height: 90vh;
  background-color: #1a1a1a;
  padding: 48px;
  color: #ccc;

  /* The Modal (background) */
  .modal {
    display: block;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);

    /* Black w/ opacity */
    /* Modal Content/Box */
    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      /* 15% from the top and centered */
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      /* Could be more or less, depending on screen size */

      .form-label {
        color: #333;
      }
    }
  }

}
</style>
