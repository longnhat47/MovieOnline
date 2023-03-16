<template>
  <div class="home">
    <div class="container">
      <h3>User</h3>
      
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  components:{
    
  },
  computed: {
    ...mapState('user', ['user']),

  },
  methods: {
    ...mapActions('user', ['fetchUser']),
    
  },
  created() {
    this.fetchUser();
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
}

</style>
