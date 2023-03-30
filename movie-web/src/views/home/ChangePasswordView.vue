<template>
    <div>
        <header-component />
        <change-password-component />
        <footer-component />
    </div>
</template>
  
<script>
import HeaderComponent from '../../components/HeaderComponent.vue';
import ChangePasswordComponent from '../../components/ChangePasswordComponent.vue';
import FooterComponent from '../../components/FooterComponent';
export default {
    components: {
        HeaderComponent,
        ChangePasswordComponent,
        FooterComponent
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  