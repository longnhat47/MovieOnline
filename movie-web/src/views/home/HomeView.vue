<template>
    <div>
        <header-component />
        <home-component />
        <footer-component />
    </div>
</template>
  
<script>
import HeaderComponent from '../../components/HeaderComponent.vue';
import HomeComponent from '../../components/HomeComponent';
import FooterComponent from '../../components/FooterComponent';
export default {
    components: {
        HeaderComponent,
        HomeComponent,
        FooterComponent
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  