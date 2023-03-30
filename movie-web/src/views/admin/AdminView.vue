<template>
    <div>
        <header-component />
        <admin-component />
        <footer-component />
    </div>
</template>
  
<script>
import HeaderComponent from '../../components/admin/HeaderAdminComponent.vue';
import AdminComponent from '../../components/admin/AdminComponent';
import FooterComponent from '../../components/FooterComponent';
import { mapState } from 'vuex'
export default {
    components: {
        HeaderComponent,
        AdminComponent,
        FooterComponent
    },
    computed: {
        ...mapState('user', ['currentUser']),
        check() {
            return (o) => {
                if (o) {
                    return o.is_superuser ? true : false;
                } else {
                    return false;
                }
            }
        }
    },
    methods: {
    },
    created() {
        if(!this.check(this.currentUser)){
            this.$router.push('/404')
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
  