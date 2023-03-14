<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <router-link class="navbar-brand" to="/">Phim</router-link>
        <button class="navbar-toggler btn" type="button">
          Menu
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button">
                Thể loại
              </a>
              <ul class="dropdown-menu">
                <li v-for="cat in category" :key="cat.id"><a class="dropdown-item" href="#">{{ cat.name }}</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button">
                Quốc gia
              </a>
              <ul class="dropdown-menu">
                <li v-for="cou in country" :key="cou.id"><a class="dropdown-item" href="#">{{ cou.name }}</a></li>
              </ul>
            </li>
          </ul>

          <form class="d-flex me-auto" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-secondary" type="submit">Tìm</button>
          </form>
          <button type="button" class="btn btn-outline-light btn-sm" v-if="currentUser.user == ''" @click="login">Đăng nhập</button>
          <div class="d-flex" v-else>
            <p class="text-white mb-0">{{ currentUser.user.full_name}}</p>
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
    ...mapState('category', ['category']),
    ...mapState('country', ['country']),
    ...mapState('user', ['currentUser']),
  },
  methods: {
    ...mapActions('category', ['fetchCategory']),
    ...mapActions('country', ['fetchCountry']),
    ...mapActions('user', ['logout']),
    logoutFunc(){
      this.logout()
      this.$router.push('/login')

    },
    login(){
      this.$router.push('/login')
    }

  },
  created() {
    this.fetchCategory();
    this.fetchCountry();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar {
  padding: 12px;
  background: #000;

  .navbar-brand,
  .navbar-toggler,
  .nav-link {
    color: #fff;
  }

  .navbar-toggler {
    padding: 12px;
  }

  .navbar-toggler:focus .collapse.navbar-collapse {
    display: flex;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }
}</style>
