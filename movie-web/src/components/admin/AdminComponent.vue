<template>
  <div class="home">
    <div class="container">
      <h3>Quản lý</h3>
      <div class="row">
        <ul class="nav nav-tabs">
          <li class="nav-item" v-for="(n, index) in navbar" :key="index"><a href="#" class="nav-link"
              :class="{ active: n.isActive }" @click="navHandle(n)">{{ n.title }}</a></li>
        </ul>
        <KeepAlive>
          <component :is="isComponent"></component>
        </KeepAlive>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryComponent from '@/components/admin/CategoryComponent.vue'
import CountryComponent from '@/components/admin/CountryComponent.vue'
import CommentComponent from '@/components/admin/CommentComponent.vue'
import MovieComponent from '@/components/admin/MovieComponent.vue'
import UserComponent from '@/components/admin/UserComponent.vue'
export default {
  data() {
    return {
      navbar: [
        { component:'MovieComponent',name: 'Movie', title: 'Phim', link: '/movie', isActive: false },
        { component:'CategoryComponent',name: 'Category', title: 'Danh mục', link: '/category', isActive: false },
        { component:'CountryComponent',name: 'Country', title: 'Quốc gia', link: '/country', isActive: false },
        { component:'CommentComponent',name: 'Comment', title: 'Bình luận', link: '/comment', isActive: false },
        { component:'UserComponent',name: 'User', title: 'Tài khoản', link: '/user', isActive: false },
      ],
      isComponent: 'MovieComponent'
    }
  },
  components: {
    CategoryComponent,
    CommentComponent,
    MovieComponent,
    CountryComponent,
    UserComponent
  },
  computed: {

  },
  methods: {
    navHandle(n) {
      this.navbar.forEach((o) => {
        if (o == n) {
          o.isActive = true
        } else {
          o.isActive = false
        }
      });
      switch (n.name) {
        case 'Category':
          this.isComponent = n.component
          break;
        case 'Country':
          this.isComponent = n.component
          break;
        case 'Movie':
          this.isComponent = n.component
          break;
        case 'Comment':
          this.isComponent = n.component
          break;
        case 'User':
          this.isComponent = n.component
          break;
      }
    }
  },
  created() {
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
}
</style>
