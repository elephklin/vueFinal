<template>
  <div id="app">
      <Header/>
      <Alert/>
      <router-view/>
      <Footer/>
  </div>
</template>

<script>
import $ from 'jquery';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Alert from './components/AlertMessage.vue';

export default {
   name: 'App',

   components: {
      Header,
      Footer,
      Alert,
   },
}
</script>

<style lang="scss">

@import "./assets/all.scss";

</style>
