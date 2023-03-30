<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <h3 class="col-3">Category</h3>
        <button class="btn btn-success col-2" @click="modalEvent('add')">Thêm mới</button>
      </div>
      <table class="table text-light">
        <thead>
          <tr class="row">
            <th class="col-1" scope="col">ID</th>
            <th class="col-2" scope="col">Thumbnail</th>
            <th class="col-1" scope="col">Category</th>
            <th class="col-1" scope="col">Country</th>
            <th class="col-2" scope="col">Name</th>
            <th class="col-2" scope="col">Description</th>
            <th class="col-1" scope="col">Status</th>
            <th class="col-2" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="row" v-for="(d, index) in data" :key="index">
            <th class="col-1" scope="row">{{ d.id }}</th>
            <td class="col-2"><img class="thumbnail" :src="d.thumbnail" alt=""></td>
            <td class="col-1">{{ nameCategory(d.category) }}</td>
            <td class="col-1">{{ nameCountry(d.country) }}</td>
            <td class="col-2">{{ d.name }}</td>
            <td class="col-2">{{ d.description }}</td>
            <td class="col-1"><input class="form-check-input" type="checkbox" disabled :checked="d.status"></td>
            <td class="col-2 d-flex justify-content-end">
              <button class="col-6 btn btn-secondary" @click="editModal(d)">Sửa</button>
              <button class="col-6 btn btn-danger ms-2" @click="deleteModal(d)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <div ref="modal" id="modal" class="modal" v-show="isShow" @click="hideModal">
        <!-- Add -->
        <div class="modal-content" v-show="button.add">
          <div class="row justify-content-end">
            <button class="btn-close me-3" @click="modalEvent('add')"></button>
          </div>
          <div class="p-2">
            <label for="movie-category" class="form-label">Danh mục</label>
            <select class="form-select" :value="dataModel.category" @change="dataModel.category = $event.target.value"
              id="movie-category" aria-label="Default select example">
              <option v-for="c in category" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select>
          </div>
          <div class="p-2">
            <label for="movie-country" class="form-label">Quốc gia</label>
            <select class="form-select" :value="dataModel.country" @change="dataModel.country = $event.target.value"
              id="movie-country" aria-label="Default select example">
              <option v-for="c in country" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select>
          </div>
          <div class="p-2">
            <label for="movie-name" class="form-label">Tên phim</label>
            <input type="text" class="form-control" id="movie-name" placeholder="Tên phim" v-model="dataModel.name">
          </div>
          <div class="p-2">
            <label for="movie-description" class="form-label">Mô tả</label>
            <input type="text" class="form-control" id="movie-description" placeholder="Mô tả"
              v-model="dataModel.description">
          </div>
          <div class="p-2">
            <label for="movie-thumbnail" class="form-label">Thumbnail</label>
            <input ref="thumbnailFile" type="file" class="form-control" id="movie-thumbnail" @change="getThumbnail">
          </div>
          <div class="p-2">
            <label for="movie-video" class="form-label">Video</label>
            <input ref="videoFile" type="file" class="form-control" id="movie-video" placeholder="Tên danh mục"
              @change="getVideo">
          </div>
          <button class="col-1 btn btn-success" @click="addModel">Thêm</button>
        </div>
        <!-- Edit -->
        <div class="modal-content" v-show="button.edit">
          <div class="row justify-content-end">
            <button class="btn-close me-3" @click="modalEvent('edit')"></button>
          </div>
          <div class="p-2">
            <label for="movie-category" class="form-label">Danh mục</label>
            <select class="form-select" @change="dataModel.category = $event.target.value" id="movie-category"
              aria-label="Default select example">
              <option v-for="c in category" :key="c.id" :value="c.id" :selected="c.id === dataModel.category">
                {{ c.name }}
              </option>
            </select>
          </div>
          <div class="p-2">
            <label for="movie-country" class="form-label">Quốc gia</label>
            <select class="form-select" @change="dataModel.country = $event.target.value" id="movie-country"
              aria-label="Default select example">
              <option v-for="c in country" :key="c.id" :value="c.id" :selected="c.id === dataModel.country">
                {{ c.name }}
              </option>
            </select>
          </div>
          <div class="p-2">
            <label for="movie-name" class="form-label">Tên phim</label>
            <input type="text" class="form-control" id="movie-name" placeholder="Tên phim" :value="dataModel.name"
              @change="dataModel.name = $event.target.value">
          </div>
          <div class="p-2">
            <label for="movie-description" class="form-label">Mô tả</label>
            <input type="text" class="form-control" id="movie-description" placeholder="Mô tả"
              :value="dataModel.description" @change="dataModel.description = $event.target.value">
          </div>
          <div class="p-2">
            <label for="movie-thumbnail" class="form-label me-2">Thumbnail</label>
            <img v-if="!dataModel.thumbnail.name" :src="dataModel.thumbnail" alt="thumbnail" class="mb-2"
              style="height: 50px;">
            <input ref="thumbnailFile" type="file" class="form-control" id="movie-thumbnail" @change="getThumbnail">
          </div>
          <div class="p-2">
            <label for="movie-video" class="form-label me-2">Video</label>
            <video v-if="!dataModel.video.name" :src="dataModel.video" alt="video" class="mb-2"
              style="height: 120px;"></video>
            <input ref="videoFile" type="file" class="form-control" id="movie-video" placeholder="Tên danh mục"
              @change="getVideo">
          </div>
          <div class="p-2">
            <label for="movie-status" class="form-label me-2">Trạng thái</label>
            <input type="checkbox" class="form-check-input" id="movie-status" :checked="dataModel.status"
              @change="dataModel.status = $event.target.checked">
          </div>
          <button class="col-1 btn btn-primary" @click="editModel()">Sửa</button>
        </div>
        <!-- Delete -->
        <div class="modal-content" v-show="button.delete">
          <div class="row justify-content-end">
            <button class="btn-close me-3" @click="modalEvent('delete')"></button>
          </div>
          <div class="p-4">
            <label ref="titleDelete" class="form-label text-danger fs-3 text-uppercase">Xóa danh mục</label>
          </div>
          <button class="col-1 btn btn-danger" @click="removeModel">Xóa</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import categoryService from '@/services/category/category'
import countryService from '@/services/country/country'
import movieService from '@/services/movie/movie'
export default {
  data() {
    return {
      category: null,
      country: null,
      data: null,
      dataModel: {
        id: '',
        name: '',
        category: '',
        country: '',
        description: '',
        thumbnail: '',
        video: '',
        status: '',
      },
      isShow: false,
      button: {
        add: false,
        edit: false,
        delete: false,
      }
    }
  },
  computed: {
    nameCategory() {
      return (id) => {
        var name = ''
        if (this.category) {
          this.category.forEach((o) => {
            if (o.id == id) {
              name = o.name
            }
          })
        }
        return name
      }
    },
    nameCountry() {
      return (id) => {
        var name = ''
        if (this.country) {
          this.country.forEach((o) => {
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
        case 'add':
          this.isShow = !this.isShow;
          this.button.add = !this.button.add;
          break;
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
      console.log(data)
      this.dataModel = data;
      this.isShow = !this.isShow;
      this.button.edit = !this.button.edit;
    },
    deleteModal(data) {
      this.dataModel.id = data.id;
      this.isShow = !this.isShow;
      this.button.delete = !this.button.delete;
      const el = this.$refs.titleDelete
      el.innerHTML = 'Bạn có muốn xóa quốc gia ' + `<h1>${data.name}</h1>`
    },
    async addModel() {
      await movieService.create(this.dataModel)
      this.isShow = !this.isShow;
      this.button.add = !this.button.add;
    },
    async editModel() {
      if (typeof (this.dataModel.thumbnail) != 'object') {
        delete this.dataModel.thumbnail
      }
      if (typeof (this.dataModel.video) != 'object') {
        delete this.dataModel.video
      }
      const res = await movieService.update(this.dataModel)
      var i = 0;
      while (i < this.data.length) {
        if (this.data[i].id === this.dataModel.id) {
          for (const [key] of Object.entries(this.data[i])) {
            this.data[i][key] = res.data[key];
          }
          if (typeof (this.data[i].thumbnail) == 'undefined') {
            this.data[i].thumbnail = res.data.thumbnail
          }
          if (typeof (this.data[i].video) == 'undefined') {
            this.data[i].video = res.data.video
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
      movieService.delete(this.dataModel.id)
      var i = 0;
      while (i < this.data.length) {
        if (this.data[i].id === this.dataModel.id) {
          console.log(this.data[i]);
          this.data.splice(i, 1);
          break;
        } else {
          ++i;
        }
      }
      this.isShow = !this.isShow;
      this.button.delete = !this.button.delete;
    },
    getThumbnail(e) {
      this.dataModel.thumbnail = e.target.files[0]
    },
    getVideo(e) {
      this.dataModel.video = e.target.files[0]
    }
  },
  async created() {
    const res = await Promise.all([categoryService.getAll(), countryService.getAll(), movieService.getAllAdmin()])
    this.category = res[0].data
    this.country = res[1].data
    this.data = res[2].data
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

  .thumbnail {
    height: 50px;
  }

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

}</style>
