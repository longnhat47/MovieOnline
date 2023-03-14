<template>
    <div>
        <header-component />
        <admin-component />
        <footer-component />
    </div>
</template>
  
<script>
import HeaderComponent from '../../components/HeaderComponent.vue';
import AdminComponent from '../../components/AdminComponent';
import FooterComponent from '../../components/FooterComponent';
export default {
    components: {
        HeaderComponent,
        AdminComponent,
        FooterComponent
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  