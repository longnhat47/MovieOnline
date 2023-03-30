<template>
    <div>
        <header-component />
        <update-profile-component />
        <footer-component />
    </div>
</template>
  
<script>
import HeaderComponent from '../../components/HeaderComponent.vue';
import UpdateProfileComponent from '../../components/UpdateProfileComponent.vue';
import FooterComponent from '../../components/FooterComponent';
export default {
    components: {
        HeaderComponent,
        UpdateProfileComponent,
        FooterComponent
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  