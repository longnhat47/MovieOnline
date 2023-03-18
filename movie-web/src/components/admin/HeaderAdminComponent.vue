<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <router-link class="navbar-brand" to="/">Admin Manager</router-link>
        
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          

          <!-- <form class="d-flex me-auto" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-secondary" type="submit">Tìm</button>
          </form> -->
          <button type="button" class="btn btn-outline-light btn-sm" v-if="currentUser == null" @click="login">Đăng nhập</button>
          <div class="d-flex" v-else>
            <p class="text-white mb-0">{{ currentUser.full_name}}</p>
            <button type="button" class="btn btn-outline-light btn-sm ms-4" @click="logoutFunc">Đăng xuất</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      userInfo: null
    }
  },
  computed: {
    ...mapState('user', ['currentUser']),
  },
  methods: {
    ...mapActions('user', ['logout']),
    logoutFunc(){
      localStorage.removeItem('token');
      this.logout()
      this.$router.push('/login')

    },
    login(){
      this.$router.push('/login')
    }

  },
  created() {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar {
  padding: 12px;
  background: #000;

  .navbar-brand{
    color: #fff;
  }

}</style>
