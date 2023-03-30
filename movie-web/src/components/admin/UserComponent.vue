<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <h3 class="col-3">User</h3>
        <button class="btn btn-success col-3" @click="modalEvent('add')">Thêm mới tài khoản staff</button>
      </div>
      <table class="table text-light">
        <thead>
          <tr class="row">
            <th class="col-1" scope="col">ID</th>
            <th class="col-2" scope="col">Email</th>
            <th class="col-3" scope="col">FullName</th>
            <th class="col-2" scope="col">BirthDay</th>
            <th class="col-1" scope="col">Image</th>
            <th class="col-1" scope="col">Status</th>
            <th class="col-2" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="row" v-for="(d, index) in data" :key="index">
            <th class="col-1" scope="row">{{ d.id }}</th>
            <td class="col-2">{{ d.email }}</td>
            <td class="col-3">{{ d.full_name }}</td>
            <td class="col-2">{{ d.birthday }}</td>
            <td class="col-1">
              <img :src="d.image" alt="image" style="height: 50px;">
            </td>
            <td class="col-1">
              <input type="checkbox" name="status" id="user-status" class="form-check-input" :checked="d.is_active" disabled>
            </td>
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
          <div class="p-2">
            <label for="name" class="form-label">Họ tên</label>
            <input type="text" class="form-control" id="name" placeholder="Họ tên" v-model="dataModel.name">
          </div>
          <div class="p-2">
            <label for="name" class="form-label">Ngày sinh</label>
            <input type="date" class="form-control" id="name" v-model="dataModel.name">
          </div>
          <div class="p-2">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" placeholder="email@example.com" v-model="dataModel.email">
          </div>
          <div class="p-2">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="dataModel.password">
          </div>
          <div class="p-2">
            <label for="re-password" class="form-label">Xác nhận password</label>
            <input type="password" class="form-control" id="re-password" v-model="dataModel.re_password">
          </div>
          <button class="col-1 btn btn-success" @click="addModel">Thêm</button>
        </div>
        <!-- Edit -->
        <div class="modal-content" v-show="button.edit">
          <div class="row justify-content-end">
            <button class="btn-close me-3" @click="modalEvent('edit')"></button>
          </div>
          <div class="p-2">
            <label for="name-edit" class="form-label">Họ tên</label>
            <input type="text" class="form-control" id="name-edit" placeholder="Họ tên" :value="dataModel.full_name"
              @change="dataModel.full_name = $event.target.value">
          </div>
          <div class="p-2">
            <label for="birthday" class="form-label">Ngày sinh</label>
            <input type="date" class="form-control" id="birthday" :value="dataModel.birthday"
              @change="dataModel.birthday = $event.target.value">
          </div>
          <div class="p-2">
            <label for="email-edit" class="form-label">Email</label>
            <input type="email" class="form-control" id="email-edit" placeholder="email@example.com" :value="dataModel.email"
              @change="dataModel.email = $event.target.value">
          </div>
          <div class="p-2">
            <label for="image" class="form-label">Image</label>
            <input ref="imageFile" type="file" class="form-control" id="image" @change="getImage">
          </div>
          <div class="p-2">
            <label for="active" class="form-label">Active</label>
            <input type="checkbox" class="form-check-input" id="active" :checked="dataModel.is_active" @change="dataModel.is_active = $event.target.checked">
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
import userService from '@/services/user/user'
// import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      data: null,
      dataModel: {
        id: '',
        full_name: '',
        birthday: '',
        email: '',
        image: '',
        is_active: ''
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
    // ...mapState('user', ['users']),

  },
  methods: {
    // ...mapActions('user', ['fetchUser', 'createUser', 'updateUser', 'deleteUser']),
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
      for(const key of Object.keys(this.dataModel)) {
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
      el.innerHTML = 'Bạn có muốn xóa người dùng ' + `<h1>${data.email}</h1>`
    },
    addModel() {
      // this.createUser(this.dataModel)
      this.isShow = !this.isShow;
      this.button.add = !this.button.add;
      console.log(this.data)
    },
    async editModel() {
      if (this.dataModel.image == null || this.dataModel.image.name == null) {
        delete this.dataModel.image
      }
      const res = await userService.updateUser(this.dataModel)
      var i = 0;
      while (i < this.data.length) {
        if (this.data[i].id === this.dataModel.id) {
          for (const [key] of Object.entries(this.data[i])) {
            this.data[i][key] = res.data[key];
          }
          if (typeof (this.data[i].image) == 'undefined') {
            this.data[i].image = res.data.image
          }
          break;
        } else {
          ++i;
        }
      }
      this.isShow = !this.isShow;
      this.button.edit = !this.button.edit;
    },
    async removeModel() {
      await userService.deleteAdmin(this.dataModel.id)
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
    getImage() {
      this.dataModel.image = this.$refs.imageFile.files[0]
    }
  },
  async created() {
    const res = await userService.getUsers()
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

}</style>
