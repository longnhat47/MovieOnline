<template>
  <div class="register">
    <div class="container text-center mt-5">
      <form @submit.prevent="registerFunc" class="form border border-dark-subtle rounded p-5">
        <h3 class="h3 mb-3">Đăng ký</h3>
        <div class="mb-3 row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="text" required class="form-control" id="staticEmail" placeholder="email@example.com"
              v-model="data.email">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input type="password" required class="form-control" id="inputPassword" v-model="data.password">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword2" class="col-sm-2 col-form-label">Nhập lại Password</label>
          <div class="col-sm-10">
            <input type="password" required class="form-control" id="inputPassword2" v-model="rePassword">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputName" class="col-sm-2 col-form-label">Họ tên</label>
          <div class="col-sm-10">
            <input type="text" required class="form-control" id="inputName" v-model="data.full_name">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputBirthday" class="col-sm-2 col-form-label">Ngày sinh</label>
          <div class="col-sm-10">
            <input type="date" required class="form-control" id="inputBirthday" v-model="data.birthday">
          </div>
        </div>
        <div class="mb-3 row text-center">
          <div class="col-sm-6">
            <button class="btn btn-secondary me-5" @click="this.$router.back()">Quay lại</button>
            <button class="btn btn-primary">Đăng ký</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      data: {
        email: '',
        password: '',
        full_name: '',
        birthday: '',
      },
      rePassword: ''
    }
  },
  methods: {
    ...mapActions('user', ['register']),
    async registerFunc() {
      if (this.data.password === this.rePassword) {
        const res = await this.register(this.data)
        if (res.status == 201) {
          alert('Đăng ký thành công')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        }
        else {
          alert('Đăng ký thất bại')
        }
      }else{
        alert('Mật khẩu không trùng khớp')
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
