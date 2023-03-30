<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <router-link class="navbar-brand" to="/">Phim</router-link>
        <button class="navbar-toggler btn" type="button" @click="this.open = !this.open">
          Menu
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" :style="{ display: open ? 'block' : 'none' }">
          <ul class="navbar-nav mb-2 mb-lg-0 me-auto">
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
          
          <button type="button" class="btn btn-outline-light btn-sm" v-if="currentUser == null" @click="login">Đăng
            nhập</button>

          <ul class="navbar-nav mb-2 mb-lg-0" v-else>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" v-if="currentUser.full_name">
                {{ currentUser.full_name }}
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/update-profile">Cập nhật thông tin</a></li>
                <li><a class="dropdown-item" href="/change-password">Đổi mật khẩu</a></li>
                <li><a class="dropdown-item" @click="logoutFunc" href="#">Đăng xuất</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import categoryService from '@/services/category/category'
import countryService from '@/services/country/country'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      userInfo: null,
      category: null,
      country: null,
      open: false
    }
  },
  computed: {
    ...mapState('user', ['currentUser']),
  },
  methods: {
    ...mapActions('user', ['logout']),
    logoutFunc() {
      localStorage.removeItem('token');
      this.logout()
      this.$router.push('/login')
    },
    login() {
      this.$router.push('/login')
    }

  },
  async created() {
    const res = await Promise.all([categoryService.getAll(), countryService.getAll()])
    this.category = res[0].data
    this.country = res[1].data
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

    .open {
      display: block;
    }
  }

  .navbar-toggler:focus .collapse.navbar-collapse {
    display: flex;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }
}</style>
