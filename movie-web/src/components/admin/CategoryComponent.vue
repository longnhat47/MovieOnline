<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <h3 class="col-3">Category</h3>
        <button class="btn btn-success col-1" @click="modalEvent('add')">Thêm mới</button>
      </div>
      <table class="table text-light">
        <thead>
          <tr class="row">
            <th class="col-4" scope="col">ID</th>
            <th class="col-5" scope="col">Name</th>
            <th class="col-2" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="row" v-for="(d, index) in data" :key="index">
            <th class="col-4" scope="row">{{ d.id }}</th>
            <td class="col-5">{{ d.name }}</td>
            <td class="col-2 d-flex justify-content-end">
              <button class="btn btn-secondary" @click="editModal(d)">Sửa</button>
              <button class="btn btn-danger ms-2" @click="deleteModal(d)">Xóa</button>
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
          <div class="p-4">
            <label for="name" class="form-label">Tên danh mục</label>
            <input type="text" class="form-control" id="name" placeholder="Tên danh mục" v-model="dataModel.name">
          </div>
          <button class="col-1 btn btn-success" @click="addModel">Thêm</button>
        </div>
        <!-- Edit -->
        <div class="modal-content" v-show="button.edit">
          <div class="row justify-content-end">
            <button class="btn-close me-3" @click="modalEvent('edit')"></button>
          </div>
          <div class="p-4">
            <label for="edit" class="form-label">Sửa danh mục</label>
            <input ref="edit" type="text" class="form-control" id="edit" placeholder="Tên danh mục"
              @input="dataModel.name = $event.target.value">
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
export default {
  data() {
    return {
      data: null,
      dataModel: {
        id: '',
        name: ''
      },
      isShow: false,
      button: {
        add: false,
        edit: false,
        delete: false,
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
      if(event.target.id=='modal'){
        this.$refs.modal.style.display = 'none'
      }
    },
    editModal(data) {
      this.dataModel.id = data.id;
      this.dataModel.name = data.name;
      this.isShow = !this.isShow;
      this.button.edit = !this.button.edit;
      const el = this.$refs.edit
      el.value = data.name
    },
    deleteModal(data) {
      this.dataModel.id = data.id;
      this.isShow = !this.isShow;
      this.button.delete = !this.button.delete;
      const el = this.$refs.titleDelete
      el.innerHTML = 'Bạn có muốn xóa danh mục ' + `<h1>${data.name}</h1>`
    },
    async addModel() {
      const res = await categoryService.create(this.dataModel)
      console.log(res)
      this.data.unshift(res.data)
      this.isShow = !this.isShow;
      this.button.add = !this.button.add;
    },
    async editModel() {
      await categoryService.update(this.dataModel)
      var i = 0;
      while (i < this.data.length) {
        if (this.data[i].id === this.dataModel.id) {
          console.log(this.data[i]);
          this.data[i].name = this.dataModel.name;
          break;
        } else {
          ++i;
        }
      }
      this.isShow = !this.isShow;
      this.button.edit = !this.button.edit;
    },
    async removeModel() {
      await categoryService.delete(this.dataModel.id)
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
    }
  },
  async created() {
    const res = await categoryService.getAll()
    this.data = res.data
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
