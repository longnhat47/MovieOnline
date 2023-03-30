<template>
  <div class="login">
    <div class="container text-center mt-5">
      <form @submit.prevent="loginFunc" class="form border border-dark-subtle rounded p-5">
        <h3 class="h3 mb-3">Đăng nhập</h3>
        <div class="mb-3 row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="text" required class="form-control" id="staticEmail" placeholder="email@example.com"
              v-model="data.email">
          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10 mb-1">
            <input type="password" required class="form-control" id="inputPassword" v-model="data.password">
          </div>
          <span>Chưa có tài khoản?<a href="/register">Đăng ký</a></span>
        </div>
        <div class="mb-3 row text-center">
          <div class="col-sm-6">
            <button class="btn btn-secondary me-5" @click="this.$router.back()">Quay lại</button>
            <button class="btn btn-primary">Đăng nhập</button>
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
      }
    }
  },
  methods: {
    ...mapActions('user', ['loginUser']),
    async loginFunc() {
      const res = await this.loginUser(this.data)
      if (res.status == 200) {
        if (res.data.user.is_superuser) {
          window.localStorage.setItem('token', res.data.token.access);
          alert('Chào mừng quản trị viên')
          setTimeout(() => {
            this.$router.push('/admin')
          }, 1300)
        }else{
          window.localStorage.setItem('token', res.data.token.access);
          alert('Đăng nhập thành công')
        setTimeout(() => {
          this.$router.push('/')
        }, 1300)
        }
      }
      else {
        alert('Đăng nhập thất bại')
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
