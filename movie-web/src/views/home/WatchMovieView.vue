<template>
    <div>
        <header-component />
        <watch-movie-component />
        <footer-component />
    </div>
</template>
  
<script>
import HeaderComponent from '../../components/HeaderComponent.vue';
import WatchMovieComponent from '../../components/WatchMovieComponent.vue';
import FooterComponent from '../../components/FooterComponent';
export default {
    components: {
        HeaderComponent,
        WatchMovieComponent,
        FooterComponent
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  